import test from 'node:test';
import assert from 'node:assert/strict';
import { computeSortedChartRows } from '../components/ArticleBarChartFigure';
import { getCarouselTrackOffsetPercent } from '../components/ArticleCarouselFigure';
import {
  addArticleComment,
  ALL_REFERENCE_POSTS,
  FEATURED_REFERENCE_POSTS,
  findReferencePostById,
  getEngagementForPost,
  getGridReferencePosts,
  getReferenceChapterInfo,
  getReferencePostById,
  getReferencePostsByChapter,
  getSidebarReferencePosts,
  loadEngagementMap,
  OTHER_REFERENCE_POSTS,
  REFERENCE_CHAPTERS,
  saveEngagementMap,
  SIDEBAR_REFERENCE_LIMIT,
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

test('FEATURED_REFERENCE_POSTS has 2 main articles assigned to Chương 3 and Chương 1 and all posts start at 0', () => {
  assert.equal(FEATURED_REFERENCE_POSTS.length, 2);
  assert.equal(
    FEATURED_REFERENCE_POSTS[0].title,
    'Câu chuyện của Dell và Asus, thiết kế và gia công'
  );
  assert.equal(FEATURED_REFERENCE_POSTS[0].category, 'Chương 3');
  assert.equal(
    FEATURED_REFERENCE_POSTS[0].sourceUrl,
    'https://scashwin.medium.com/the-case-of-dell-and-asus-acac9a35db56'
  );
  assert.equal(
    FEATURED_REFERENCE_POSTS[1].title,
    'Cuộc tranh luận lịch sử về GUI: Steve Jobs, Bill Gates và phát minh "mượn" từ Xerox'
  );
  assert.equal(FEATURED_REFERENCE_POSTS[1].category, 'Chương 1');
  assert.equal(
    FEATURED_REFERENCE_POSTS[1].detailCategory,
    'Chương 1: Giới thiệu nhập môn kỹ thuật'
  );
  assert.equal(
    FEATURED_REFERENCE_POSTS[1].sourceUrl,
    'https://medium.com/@davidsehyeonbaek/the-great-gui-debate-steve-jobs-bill-gates-and-the-borrowed-innovation-from-xerox-6402e7b654c8'
  );
  assert.equal(OTHER_REFERENCE_POSTS.length, 17);

  const sidebarPosts = getSidebarReferencePosts();
  const gridPosts = getGridReferencePosts();
  assert.equal(sidebarPosts.length, SIDEBAR_REFERENCE_LIMIT);
  assert.equal(sidebarPosts.length, 5);
  assert.equal(gridPosts.length, 12);
  assert.equal(sidebarPosts[0]?.id, 'other-1');
  assert.equal(sidebarPosts[1]?.id, 'other-inventions');
  assert.equal(sidebarPosts[2]?.id, 'other-minds');
  assert.equal(sidebarPosts[3]?.id, 'other-roles');
  assert.equal(sidebarPosts[4]?.id, 'other-careers');
  assert.equal(gridPosts[0]?.id, 'other-ee-profile');
  assert.equal(gridPosts[1]?.id, 'other-engineering-choice');
  assert.equal(gridPosts[2]?.id, 'featured-2');
  assert.equal(gridPosts[3]?.category, 'Chương 2');
  assert.equal(gridPosts[4]?.id, 'featured-1');
  assert.equal(gridPosts[4]?.category, 'Chương 3');
  assert.equal(gridPosts[11]?.category, 'Chương 10');

  assert.equal(REFERENCE_CHAPTERS.length, 10);
  assert.equal(
    getReferenceChapterInfo(1).detailLabel,
    'Chương 1: Giới thiệu nhập môn kỹ thuật'
  );
  assert.equal(getReferenceChapterInfo(3).detailLabel, 'Chương 3');

  const ch1Posts = getReferencePostsByChapter(1);
  assert.equal(ch1Posts.length, 8);
  assert.ok(ch1Posts.some((p) => p.id === 'other-minds'));
  assert.ok(ch1Posts.some((p) => p.id === 'other-roles'));
  assert.ok(ch1Posts.some((p) => p.id === 'other-careers'));
  assert.ok(ch1Posts.some((p) => p.id === 'other-ee-profile'));
  assert.ok(ch1Posts.some((p) => p.id === 'other-engineering-choice'));
  assert.ok(ch1Posts.some((p) => p.id === 'featured-2'));

  const ch3Posts = getReferencePostsByChapter(3);
  assert.equal(ch3Posts.length, 1);
  assert.equal(ch3Posts[0]?.id, 'featured-1');

  for (const post of OTHER_REFERENCE_POSTS) {
    assert.match(post.category, /^Chương (?:[1-9]|10)$/);
    assert.ok(post.detailCategory?.startsWith(post.category));
    assert.ok(post.readTime.includes('phút đọc'));
  }

  const mindsPost = findReferencePostById('other-minds');
  assert.ok(mindsPost);
  assert.equal(
    mindsPost.title,
    'Những bộ óc đứng sau các cuộc cách mạng công nghệ'
  );
  assert.equal(mindsPost.category, 'Chương 1');
  const mindsFigures = mindsPost.bodyParagraphs.filter(
    (b) => typeof b !== 'string' && b.type === 'figure'
  );
  assert.equal(mindsFigures.length, 5);

  const rolesPost = findReferencePostById('other-roles');
  assert.ok(rolesPost);
  assert.equal(rolesPost.title, 'Kỹ sư, nhà khoa học hay nhà công nghệ?');
  assert.equal(rolesPost.category, 'Chương 1');
  const rolesCarousel = rolesPost.bodyParagraphs.find(
    (b) => typeof b !== 'string' && b.type === 'carousel'
  );
  assert.ok(rolesCarousel && typeof rolesCarousel !== 'string' && rolesCarousel.type === 'carousel');
  assert.equal(rolesCarousel.slides.length, 5);
  assert.ok(
    rolesCarousel.slides.every((slide) => slide.src !== rolesPost.imageSrc),
    'other-roles carousel must exclude the article thumbnail imageSrc'
  );

  const careersPost = findReferencePostById('other-careers');
  assert.ok(careersPost);
  assert.equal(
    careersPost.title,
    'Một tấm bằng kỹ thuật, hàng chục con đường sự nghiệp'
  );
  assert.equal(careersPost.category, 'Chương 1');
  const careersFigures = careersPost.bodyParagraphs.filter(
    (b) => typeof b !== 'string' && b.type === 'figure'
  );
  assert.equal(careersFigures.length, 3);
  assert.deepEqual(
    careersFigures.map((f) => (typeof f !== 'string' && f.type === 'figure' ? f.src : '')),
    [
      '/assets/aistudio/image_21118581.png',
      '/assets/aistudio/image_f472512e.png',
      '/assets/aistudio/image_4f3ccc78.png',
    ]
  );

  const eePost = findReferencePostById('other-ee-profile');
  assert.ok(eePost);
  assert.equal(eePost.title, 'Chân dung một kỹ sư điện – điện tử');
  assert.equal(eePost.category, 'Chương 1');
  assert.equal(eePost.imageSrc, '/assets/aistudio/image_52f797e7.png');
  const eeCarousel = eePost.bodyParagraphs.find(
    (b) => typeof b !== 'string' && b.type === 'carousel'
  );
  assert.ok(eeCarousel && typeof eeCarousel !== 'string' && eeCarousel.type === 'carousel');
  assert.equal(eeCarousel.slides.length, 2);
  assert.deepEqual(
    eeCarousel.slides.map((s) => s.src),
    [
      '/assets/aistudio/image_e516cc48.png',
      '/assets/aistudio/image_1906b8ac.png',
    ]
  );
  assert.ok(
    eeCarousel.slides.every((slide) => slide.src !== eePost.imageSrc),
    'other-ee-profile carousel must exclude the article thumbnail imageSrc'
  );

  const choicePost = findReferencePostById('other-engineering-choice');
  assert.ok(choicePost);
  assert.equal(choicePost.title, 'Kỹ thuật có còn là lựa chọn hấp dẫn?');
  assert.equal(choicePost.category, 'Chương 1');
  assert.equal(choicePost.imageSrc, '/assets/aistudio/image_dca56eee.png');
  const choiceCharts = choicePost.bodyParagraphs.filter(
    (b) => typeof b !== 'string' && b.type === 'chart'
  );
  assert.equal(choiceCharts.length, 2);
  if (
    typeof choiceCharts[0] !== 'string' &&
    choiceCharts[0]?.type === 'chart' &&
    typeof choiceCharts[1] !== 'string' &&
    choiceCharts[1]?.type === 'chart'
  ) {
    assert.equal(choiceCharts[0].items.length, 11);
    assert.equal(choiceCharts[1].items.length, 11);
    const enrollmentRows = computeSortedChartRows(choiceCharts[0].items);
    assert.equal(enrollmentRows[0]?.label, 'Kỹ thuật Xây dựng');
    assert.equal(enrollmentRows[0]?.value, 958);
    assert.equal(enrollmentRows[0]?.widthPercent, 100);
    const graduationRows = computeSortedChartRows(choiceCharts[1].items);
    assert.equal(graduationRows[0]?.label, 'Kỹ thuật Xây dựng');
    assert.equal(graduationRows[0]?.value, 566);
    assert.equal(graduationRows[1]?.label, 'Điện – Điện tử');
    assert.equal(graduationRows[1]?.value, 384);
    assert.equal(graduationRows[1]?.highlight, true);
  }
  const choiceFigures = choicePost.bodyParagraphs.filter(
    (b) => typeof b !== 'string' && b.type === 'figure'
  );
  assert.equal(choiceFigures.length, 1);

  for (const post of ALL_REFERENCE_POSTS) {
    assert.equal(post.initialLikes, 0);
    assert.equal(post.initialComments.length, 0);
  }

  assert.equal(findReferencePostById('featured-1')?.id, 'featured-1');
  assert.equal(findReferencePostById('other-10')?.id, 'other-10');
  assert.equal(findReferencePostById('nonexistent'), null);
});

test('getCarouselTrackOffsetPercent peeks adjacent slides cleanly on start, middle, and end', () => {
  assert.equal(getCarouselTrackOffsetPercent(0, 1), 0);
  assert.equal(getCarouselTrackOffsetPercent(0, 5), 0);
  assert.equal(getCarouselTrackOffsetPercent(1, 5), -67);
  assert.equal(getCarouselTrackOffsetPercent(4, 5), -290);
  assert.equal(getCarouselTrackOffsetPercent(0, 2), 0);
  assert.equal(getCarouselTrackOffsetPercent(1, 2), -56);
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
