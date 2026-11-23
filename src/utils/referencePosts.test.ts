import test from 'node:test';
import assert from 'node:assert/strict';
import {
  addArticleComment,
  ALL_REFERENCE_POSTS,
  FEATURED_REFERENCE_POSTS,
  findReferencePostById,
  getEngagementForPost,
  getReferencePostById,
  loadEngagementMap,
  OTHER_REFERENCE_POSTS,
  saveEngagementMap,
  stepReferenceIndex,
  toggleArticleLike,
} from './referencePosts';

function createMemoryStorage(): Storage {
  const store = new Map<string, string>();
  return {
    get length() {
      return store.size;
    },
    clear() {
      store.clear();
    },
    getItem(key: string) {
      return store.get(key) ?? null;
    },
    key(index: number) {
      return Array.from(store.keys())[index] ?? null;
    },
    removeItem(key: string) {
      store.delete(key);
    },
    setItem(key: string, value: string) {
      store.set(key, value);
    },
  };
}

test('FEATURED_REFERENCE_POSTS has 2 main articles and all posts start with 0 likes and 0 comments', () => {
  assert.equal(FEATURED_REFERENCE_POSTS.length, 2);
  assert.equal(
    FEATURED_REFERENCE_POSTS[0].title,
    'Câu chuyện của Dell và Asus'
  );
  assert.equal(
    FEATURED_REFERENCE_POSTS[0].sourceUrl,
    'https://scashwin.medium.com/the-case-of-dell-and-asus-acac9a35db56'
  );
  assert.equal(
    FEATURED_REFERENCE_POSTS[1].title,
    'Cuộc tranh luận lịch sử về GUI: Steve Jobs, Bill Gates và phát minh "mượn" từ Xerox'
  );
  assert.equal(
    FEATURED_REFERENCE_POSTS[1].sourceUrl,
    'https://medium.com/@davidsehyeonbaek/the-great-gui-debate-steve-jobs-bill-gates-and-the-borrowed-innovation-from-xerox-6402e7b654c8'
  );
  assert.ok(OTHER_REFERENCE_POSTS.length >= 4);

  const featuredIds = new Set(FEATURED_REFERENCE_POSTS.map((p) => p.id));
  for (const post of OTHER_REFERENCE_POSTS) {
    assert.equal(featuredIds.has(post.id), false);
    assert.ok(post.readTime.includes('phút đọc'));
  }

  for (const post of ALL_REFERENCE_POSTS) {
    assert.equal(post.initialLikes, 0);
    assert.equal(post.initialComments.length, 0);
  }

  assert.equal(findReferencePostById('featured-1')?.id, 'featured-1');
  assert.equal(findReferencePostById('nonexistent'), null);
});

test('stepReferenceIndex wraps smoothly across the 2 featured articles', () => {
  assert.equal(stepReferenceIndex(0, -1, 2), 1);
  assert.equal(stepReferenceIndex(0, 1, 2), 1);
  assert.equal(stepReferenceIndex(1, 1, 2), 0);
  assert.equal(stepReferenceIndex(1, -1, 2), 0);
});

test('toggleArticleLike and addArticleComment update counts and persist in storage', () => {
  const storage = createMemoryStorage();
  const post = FEATURED_REFERENCE_POSTS[0];
  let map = loadEngagementMap(storage);

  assert.equal(getEngagementForPost(map, post, 'a@example.com').isLiked, false);
  assert.equal(getEngagementForPost(map, post, 'a@example.com').likeCount, 0);
  assert.equal(getEngagementForPost(map, post, 'a@example.com').commentCount, 0);

  map = toggleArticleLike(map, post.id, 'A@example.com');
  assert.equal(getEngagementForPost(map, post, 'a@example.com').isLiked, true);
  assert.equal(getEngagementForPost(map, post, 'a@example.com').likeCount, 1);

  const emptyResult = addArticleComment(map, post.id, 'Nguyễn Văn A', '   ');
  assert.equal(emptyResult.added, false);

  const validResult = addArticleComment(
    map,
    post.id,
    'Nguyễn Văn A',
    'Bài viết hay!'
  );
  assert.equal(validResult.added, true);
  saveEngagementMap(storage, validResult.nextMap);

  const reloaded = loadEngagementMap(storage);
  const stats = getEngagementForPost(reloaded, post, 'a@example.com');
  assert.equal(stats.isLiked, true);
  assert.equal(stats.commentCount, 1);
  assert.equal(stats.comments[0]?.text, 'Bài viết hay!');
  assert.equal(getReferencePostById('other-2').id, 'other-2');
});
