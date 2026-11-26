import test from 'node:test';
import assert from 'node:assert/strict';
import { computeSortedChartRows } from '../components/ArticleBarChartFigure';
import { getCarouselTrackOffsetPercent } from '../components/ArticleCarouselFigure';
import {
  addArticleComment,
  ALL_REFERENCE_POSTS,
  createRandomizedReferenceFeed,
  FEATURED_REFERENCE_LIMIT,
  FEATURED_REFERENCE_POSTS,
  findReferencePostById,
  getEngagementForPost,
  getGridReferencePosts,
  getReferenceChapterInfo,
  getReferencePostById,
  getReferencePostsByChapter,
  getSidebarReferencePosts,
  isPlaceholderReferencePost,
  loadEngagementMap,
  MANDATORY_FEATURED_REFERENCE_IDS,
  OTHER_REFERENCE_POSTS,
  PAGE_LOAD_REFERENCE_FEED,
  REFERENCE_CHAPTERS,
  saveEngagementMap,
  SIDEBAR_REFERENCE_LIMIT,
  stepReferenceIndex,
  toggleArticleLike,
  validateArticleCommentInput,
  VISITOR_ENGAGEMENT_ID,
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
  assert.equal(OTHER_REFERENCE_POSTS.length, 53);

  const sidebarPosts = getSidebarReferencePosts();
  const gridPosts = getGridReferencePosts();
  assert.equal(sidebarPosts.length, SIDEBAR_REFERENCE_LIMIT);
  assert.equal(sidebarPosts.length, 5);
  assert.equal(gridPosts.length, 48);
  assert.equal(sidebarPosts[0]?.id, 'other-1');
  assert.equal(sidebarPosts[1]?.id, 'other-inventions');
  assert.equal(sidebarPosts[2]?.id, 'other-minds');
  assert.equal(sidebarPosts[3]?.id, 'other-roles');
  assert.equal(sidebarPosts[4]?.id, 'other-careers');
  assert.equal(gridPosts[0]?.id, 'other-ee-profile');
  assert.equal(gridPosts[1]?.id, 'other-engineering-choice');
  assert.equal(gridPosts[2]?.id, 'featured-2');
  assert.equal(gridPosts[3]?.id, 'ch2-passion');
  assert.equal(gridPosts[3]?.category, 'Chương 2');
  assert.equal(gridPosts[7]?.id, 'featured-1');
  assert.equal(gridPosts[7]?.category, 'Chương 3');
  assert.equal(gridPosts[8]?.id, 'ch3-learn-how-to-learn');
  assert.equal(gridPosts[15]?.id, 'ch3-exam-and-skills');
  assert.equal(gridPosts[16]?.id, 'ch4-project-management-intro');
  assert.equal(gridPosts[16]?.category, 'Chương 4');
  assert.equal(gridPosts[20]?.id, 'ch4-team-assignment');
  assert.equal(gridPosts[21]?.id, 'ch5-teamwork-intro');
  assert.equal(gridPosts[21]?.category, 'Chương 5');
  assert.equal(gridPosts[25]?.id, 'ch5-team-evaluation');
  assert.equal(gridPosts[26]?.id, 'ch6-problem-identification');
  assert.equal(gridPosts[26]?.category, 'Chương 6');
  assert.equal(gridPosts[30]?.id, 'ch6-root-cause-selection');
  assert.equal(gridPosts[31]?.id, 'ch7-si-measurement');
  assert.equal(gridPosts[31]?.category, 'Chương 7');
  assert.equal(gridPosts[34]?.id, 'ch7-energy-circuits');
  assert.equal(gridPosts[35]?.id, 'ch8-communication-basics');
  assert.equal(gridPosts[35]?.category, 'Chương 8');
  assert.equal(gridPosts[41]?.id, 'ch8-email-correspondence');
  assert.equal(gridPosts[42]?.id, 'ch9-engineering-ethics-intro');
  assert.equal(gridPosts[42]?.category, 'Chương 9');
  assert.equal(gridPosts[46]?.id, 'ch9-workshop-ethics-cases');
  assert.equal(gridPosts[47]?.category, 'Chương 10');

  assert.equal(REFERENCE_CHAPTERS.length, 10);
  assert.equal(
    getReferenceChapterInfo(1).detailLabel,
    'Chương 1: Giới thiệu nhập môn kỹ thuật'
  );
  assert.equal(
    getReferenceChapterInfo(2).detailLabel,
    'Chương 2: Thiết kế kỹ thuật'
  );
  assert.equal(
    getReferenceChapterInfo(3).detailLabel,
    'Chương 3: Phương pháp học tập hiệu quả'
  );
  assert.equal(
    getReferenceChapterInfo(4).detailLabel,
    'Chương 4: Quản lý dự án'
  );
  assert.equal(
    getReferenceChapterInfo(5).detailLabel,
    'Chương 5: Kỹ năng làm việc nhóm'
  );
  assert.equal(
    getReferenceChapterInfo(6).detailLabel,
    'Chương 6: Kỹ năng giải quyết vấn đề và sáng tạo'
  );
  assert.equal(
    getReferenceChapterInfo(7).detailLabel,
    'Chương 7: Cơ sở kỹ thuật'
  );
  assert.equal(
    getReferenceChapterInfo(8).detailLabel,
    'Chương 8: Giao tiếp trong kỹ thuật'
  );
  assert.equal(
    getReferenceChapterInfo(9).detailLabel,
    'Chương 9: Đạo đức nghề nghiệp'
  );

  const ch1Posts = getReferencePostsByChapter(1);
  assert.equal(ch1Posts.length, 8);
  assert.ok(ch1Posts.some((p) => p.id === 'other-minds'));
  assert.ok(ch1Posts.some((p) => p.id === 'other-roles'));
  assert.ok(ch1Posts.some((p) => p.id === 'other-careers'));
  assert.ok(ch1Posts.some((p) => p.id === 'other-ee-profile'));
  assert.ok(ch1Posts.some((p) => p.id === 'other-engineering-choice'));
  assert.ok(ch1Posts.some((p) => p.id === 'featured-2'));

  const ch2Posts = getReferencePostsByChapter(2);
  assert.equal(ch2Posts.length, 4);
  assert.deepEqual(
    ch2Posts.map((p) => p.id),
    ['ch2-passion', 'ch2-system-thinking', 'ch2-frdparrc', 'ch2-ten-steps']
  );
  for (const post of ch2Posts) {
    assert.equal(post.detailCategory, 'Chương 2: Thiết kế kỹ thuật');
  }

  const ch3Posts = getReferencePostsByChapter(3);
  assert.equal(ch3Posts.length, 9);
  assert.deepEqual(
    ch3Posts.map((p) => p.id),
    [
      'featured-1',
      'ch3-learn-how-to-learn',
      'ch3-study-right',
      'ch3-active-reading',
      'ch3-memory',
      'ch3-smart-goals',
      'ch3-time-management',
      'ch3-motivation',
      'ch3-exam-and-skills',
    ]
  );

  const ch4Posts = getReferencePostsByChapter(4);
  assert.equal(ch4Posts.length, 5);
  assert.deepEqual(
    ch4Posts.map((p) => p.id),
    [
      'ch4-project-management-intro',
      'ch4-project-balance',
      'ch4-project-planning',
      'ch4-pert-and-gantt',
      'ch4-team-assignment',
    ]
  );
  for (const post of ch4Posts) {
    assert.equal(post.detailCategory, 'Chương 4: Quản lý dự án');
    for (const block of post.bodyParagraphs) {
      if (typeof block === 'string') {
        assert.ok(!block.includes('[chèn ảnh'), `${post.id} must not contain raw placeholder`);
      }
    }
  }

  const ch5Posts = getReferencePostsByChapter(5);
  assert.equal(ch5Posts.length, 5);
  assert.deepEqual(
    ch5Posts.map((p) => p.id),
    [
      'ch5-teamwork-intro',
      'ch5-team-stages',
      'ch5-pride-and-skills',
      'ch5-communication-conflict',
      'ch5-team-evaluation',
    ]
  );
  for (const post of ch5Posts) {
    assert.equal(post.detailCategory, 'Chương 5: Kỹ năng làm việc nhóm');
    for (const block of post.bodyParagraphs) {
      if (typeof block === 'string') {
        assert.ok(!block.includes('[chèn ảnh'), `${post.id} must not contain raw placeholder`);
        assert.ok(!block.includes('Thông điệp biên tập'), `${post.id} must not contain editorial label artifact`);
      }
    }
  }

  const ch6Posts = getReferencePostsByChapter(6);
  assert.equal(ch6Posts.length, 5);
  assert.deepEqual(
    ch6Posts.map((p) => p.id),
    [
      'ch6-problem-identification',
      'ch6-systematic-thinking',
      'ch6-six-thinking-hats',
      'ch6-scamper-mindmap',
      'ch6-root-cause-selection',
    ]
  );
  for (const post of ch6Posts) {
    assert.equal(
      post.detailCategory,
      'Chương 6: Kỹ năng giải quyết vấn đề và sáng tạo'
    );
    const tables = post.bodyParagraphs.filter(
      (b) => typeof b !== 'string' && b.type === 'table'
    );
    assert.equal(tables.length, 1, `${post.id} must include its structured comparison table`);
    for (const block of post.bodyParagraphs) {
      if (typeof block === 'string') {
        assert.ok(!block.includes('[chèn ảnh'), `${post.id} must not contain raw placeholder`);
        assert.ok(!block.includes('\t'), `${post.id} must not contain raw tab-separated table text`);
      }
    }
  }

  const ch7Posts = getReferencePostsByChapter(7);
  assert.equal(ch7Posts.length, 4);
  assert.deepEqual(
    ch7Posts.map((p) => p.id),
    [
      'ch7-si-measurement',
      'ch7-basic-math',
      'ch7-mechanics-basics',
      'ch7-energy-circuits',
    ]
  );
  for (const post of ch7Posts) {
    assert.equal(post.detailCategory, 'Chương 7: Cơ sở kỹ thuật');
    for (const block of post.bodyParagraphs) {
      if (typeof block === 'string') {
        assert.ok(!block.includes('[chèn ảnh'), `${post.id} must not contain raw placeholder`);
      }
    }
  }

  const ch8Posts = getReferencePostsByChapter(8);
  assert.equal(ch8Posts.length, 7);
  assert.deepEqual(
    ch8Posts.map((p) => p.id),
    [
      'ch8-communication-basics',
      'ch8-technical-presentation',
      'ch8-public-speaking',
      'ch8-technical-report',
      'ch8-active-listening',
      'ch8-asking-questions',
      'ch8-email-correspondence',
    ]
  );
  for (const post of ch8Posts) {
    assert.equal(post.detailCategory, 'Chương 8: Giao tiếp trong kỹ thuật');
    for (const block of post.bodyParagraphs) {
      if (typeof block === 'string') {
        assert.ok(!block.includes('[chèn ảnh'), `${post.id} must not contain raw placeholder`);
      }
    }
  }

  const ch9Posts = getReferencePostsByChapter(9);
  assert.equal(ch9Posts.length, 5);
  assert.deepEqual(
    ch9Posts.map((p) => p.id),
    [
      'ch9-engineering-ethics-intro',
      'ch9-six-ethical-principles',
      'ch9-employer-client-public',
      'ch9-challenger-disaster',
      'ch9-workshop-ethics-cases',
    ]
  );
  for (const post of ch9Posts) {
    assert.equal(post.detailCategory, 'Chương 9: Đạo đức nghề nghiệp');
    for (const block of post.bodyParagraphs) {
      if (typeof block === 'string') {
        assert.ok(!block.includes('[chèn ảnh'), `${post.id} must not contain raw placeholder`);
      }
    }
  }

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

  const ch2Passion = findReferencePostById('ch2-passion');
  assert.ok(ch2Passion);
  assert.deepEqual(
    ch2Passion.bodyParagraphs
      .filter((b) => typeof b !== 'string' && b.type === 'figure')
      .map((f) => (typeof f !== 'string' && f.type === 'figure' ? f.src : '')),
    [
      '/assets/aistudio/image_a8731d1b.png',
      '/assets/aistudio/image_5e6c4a7a.png',
    ]
  );

  const ch2System = findReferencePostById('ch2-system-thinking');
  assert.ok(ch2System);
  assert.deepEqual(
    ch2System.bodyParagraphs
      .filter((b) => typeof b !== 'string' && b.type === 'figure')
      .map((f) => (typeof f !== 'string' && f.type === 'figure' ? f.src : '')),
    [
      '/assets/aistudio/image_3e29da48.png',
      '/assets/aistudio/image_f11ec35c.png',
    ]
  );

  const ch2Frdparrc = findReferencePostById('ch2-frdparrc');
  assert.ok(ch2Frdparrc);
  assert.deepEqual(
    ch2Frdparrc.bodyParagraphs
      .filter((b) => typeof b !== 'string' && b.type === 'figure')
      .map((f) => (typeof f !== 'string' && f.type === 'figure' ? f.src : '')),
    [
      '/assets/aistudio/image_4542c97a.png',
      '/assets/aistudio/image_c4ac6e0a.png',
      '/assets/aistudio/image_25cd595d.png',
    ]
  );

  const ch2TenSteps = findReferencePostById('ch2-ten-steps');
  assert.ok(ch2TenSteps);
  const stepsBlock = ch2TenSteps.bodyParagraphs.find(
    (b) => typeof b !== 'string' && b.type === 'steps'
  );
  assert.ok(stepsBlock && typeof stepsBlock !== 'string' && stepsBlock.type === 'steps');
  assert.equal(stepsBlock.phases.length, 4);
  assert.equal(
    stepsBlock.phases.reduce((sum, p) => sum + p.steps.length, 0),
    10
  );
  const stepHeadings = ch2TenSteps.bodyParagraphs.filter(
    (b) => typeof b !== 'string' && b.type === 'step-heading'
  );
  assert.equal(stepHeadings.length, 10);
  assert.deepEqual(
    ch2TenSteps.bodyParagraphs
      .filter((b) => typeof b !== 'string' && b.type === 'figure')
      .map((f) => (typeof f !== 'string' && f.type === 'figure' ? f.src : '')),
    [
      '/assets/aistudio/image_c18e6da2.png',
      '/assets/aistudio/image_40bd6fa6.png',
      '/assets/aistudio/image_bc2a1e98.png',
      '/assets/aistudio/image_1e0edb33.png',
    ]
  );

  const ch3FigureSrcs = ch3Posts.flatMap((post) =>
    post.bodyParagraphs
      .filter((b) => typeof b !== 'string' && b.type === 'figure')
      .map((f) => (typeof f !== 'string' && f.type === 'figure' ? f.src : ''))
  );
  assert.deepEqual(ch3FigureSrcs, [
    '/assets/aistudio/image_f112fa62.png',
    '/assets/aistudio/image_07ce0b2f.png',
    '/assets/aistudio/image_4c050889.png',
    '/assets/aistudio/image_34c0d505.png',
    '/assets/aistudio/image_05d62331.png',
    '/assets/aistudio/image_4c37b572.png',
    '/assets/aistudio/image_c5ef4ba9.png',
    '/assets/aistudio/image_78ee784f.png',
    '/assets/aistudio/image_aa8cbcb8.png',
    '/assets/aistudio/image_0bf29e14.png',
    '/assets/aistudio/image_adf6fb45.png',
    '/assets/aistudio/image_85515c10.png',
    '/assets/aistudio/image_36fa0c37.png',
    '/assets/aistudio/image_3fdeabcd.png',
  ]);

  const ch4FigureSrcs = ch4Posts.flatMap((post) =>
    post.bodyParagraphs
      .filter((b) => typeof b !== 'string' && b.type === 'figure')
      .map((f) => (typeof f !== 'string' && f.type === 'figure' ? f.src : ''))
  );
  assert.deepEqual(ch4FigureSrcs, [
    '/assets/aistudio/image_d88dfc09.png',
    '/assets/aistudio/image_831e9357.png',
    '/assets/aistudio/image_9692170e.png',
    '/assets/aistudio/image_3b09e416.png',
    '/assets/aistudio/image_c6290052.png',
    '/assets/aistudio/image_94a4caf6.png',
    '/assets/aistudio/image_41455bcd.png',
  ]);

  const ch4Planning = findReferencePostById('ch4-project-planning');
  assert.ok(ch4Planning);
  const charterBlocks = ch4Planning.bodyParagraphs.filter(
    (b) => typeof b !== 'string' && b.type === 'charter'
  );
  assert.equal(charterBlocks.length, 1);

  const ch5FigureSrcs = ch5Posts.flatMap((post) =>
    post.bodyParagraphs
      .filter((b) => typeof b !== 'string' && b.type === 'figure')
      .map((f) => (typeof f !== 'string' && f.type === 'figure' ? f.src : ''))
  );
  assert.deepEqual(ch5FigureSrcs, [
    '/assets/aistudio/image_1a3a66c1.png',
    '/assets/aistudio/image_729076e9.png',
    '/assets/aistudio/image_2f8d5f8d.png',
    '/assets/aistudio/image_00b9ac63.png',
    '/assets/aistudio/image_60f1388a.png',
    '/assets/aistudio/image_6978874c.png',
  ]);

  const ch5Evaluation = findReferencePostById('ch5-team-evaluation');
  assert.ok(ch5Evaluation);
  const evaluationBlocks = ch5Evaluation.bodyParagraphs.filter(
    (b) => typeof b !== 'string' && b.type === 'evaluation'
  );
  assert.equal(evaluationBlocks.length, 1);

  const ch6FigureSrcs = ch6Posts.flatMap((post) =>
    post.bodyParagraphs
      .filter((b) => typeof b !== 'string' && b.type === 'figure')
      .map((f) => (typeof f !== 'string' && f.type === 'figure' ? f.src : ''))
  );
  assert.deepEqual(ch6FigureSrcs, [
    '/assets/aistudio/image_dde134ae.png',
    '/assets/aistudio/image_9199e923.png',
    '/assets/aistudio/image_9a12d2cf.png',
    '/assets/aistudio/image_cd17a66b.png',
    '/assets/aistudio/image_d01df6a6.png',
    '/assets/aistudio/image_c74fd53f.png',
    '/assets/aistudio/image_cd437b3d.png',
    '/assets/aistudio/image_a701341d.png',
    '/assets/aistudio/image_303bed3e.png',
    '/assets/aistudio/image_fb60378e.png',
  ]);

  const ch7FigureSrcs = ch7Posts.flatMap((post) =>
    post.bodyParagraphs
      .filter((b) => typeof b !== 'string' && b.type === 'figure')
      .map((f) => (typeof f !== 'string' && f.type === 'figure' ? f.src : ''))
  );
  assert.deepEqual(ch7FigureSrcs, [
    '/assets/aistudio/image_c2e92b3a.png',
    '/assets/aistudio/image_d64f188e.png',
    '/assets/aistudio/image_ae8f4ee7.png',
    '/assets/aistudio/image_03a1df86.png',
    '/assets/aistudio/image_b4f13017.png',
    '/assets/aistudio/image_5190a848.png',
    '/assets/aistudio/image_a64075c0.png',
    '/assets/aistudio/image_974f5fd7.png',
  ]);

  const ch8FigureSrcs = ch8Posts.flatMap((post) =>
    post.bodyParagraphs
      .filter((b) => typeof b !== 'string' && b.type === 'figure')
      .map((f) => (typeof f !== 'string' && f.type === 'figure' ? f.src : ''))
  );
  assert.deepEqual(ch8FigureSrcs, [
    '/assets/aistudio/image_1eb80eae.png',
    '/assets/aistudio/image_5ccbcaeb.png',
    '/assets/aistudio/image_fb645565.png',
    '/assets/aistudio/image_020df29a.png',
    '/assets/aistudio/image_27a052db.png',
    '/assets/aistudio/image_7e2e16b9.png',
    '/assets/aistudio/image_872d8937.png',
    '/assets/aistudio/image_719860d5.png',
    '/assets/aistudio/image_a2fc9c17.png',
    '/assets/aistudio/image_0acabec6.png',
    '/assets/aistudio/image_502c8c15.png',
    '/assets/aistudio/image_a221f4b4.png',
  ]);

  const ch9FigureSrcs = ch9Posts.flatMap((post) =>
    post.bodyParagraphs
      .filter((b) => typeof b !== 'string' && b.type === 'figure')
      .map((f) => (typeof f !== 'string' && f.type === 'figure' ? f.src : ''))
  );
  assert.deepEqual(ch9FigureSrcs, [
    '/assets/aistudio/image_93c630b7.png',
    '/assets/aistudio/image_3e00be71.png',
    '/assets/aistudio/image_d7e4c6f8.png',
    '/assets/aistudio/image_c09ac9a7.png',
    '/assets/aistudio/image_b6d11c11.png',
    '/assets/aistudio/image_bba09cf8.png',
    '/assets/aistudio/image_23bd5491.png',
    '/assets/aistudio/image_ba778d50.png',
    '/assets/aistudio/image_ce10badd.png',
    '/assets/aistudio/image_ef2e347c.png',
    '/assets/aistudio/image_18c2dd63.png',
  ]);

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

test('stepReferenceIndex wraps smoothly across 4 featured articles', () => {
  assert.equal(FEATURED_REFERENCE_LIMIT, 4);
  assert.equal(stepReferenceIndex(0, -1, 4), 3);
  assert.equal(stepReferenceIndex(0, 1, 4), 1);
  assert.equal(stepReferenceIndex(3, 1, 4), 0);
  assert.equal(stepReferenceIndex(2, -1, 4), 1);
});

test('createRandomizedReferenceFeed anchors Bill Gates & Steve Jobs (Chương 1) and Dell & Asus (Chương 3) with 2 randomized posts', () => {
  function makeLcg(seed: number) {
    let state = seed >>> 0;
    return () => {
      state = (1664525 * state + 1013904223) >>> 0;
      return state / 0x100000000;
    };
  }

  assert.deepEqual(MANDATORY_FEATURED_REFERENCE_IDS, [
    'featured-2',
    'featured-1',
  ]);

  const feedA = createRandomizedReferenceFeed(ALL_REFERENCE_POSTS, makeLcg(11));
  const feedB = createRandomizedReferenceFeed(ALL_REFERENCE_POSTS, makeLcg(99));

  assert.equal(feedA.featuredPosts.length, 4);
  assert.equal(feedA.sidebarPosts.length, 5);
  assert.equal(
    feedA.featuredPosts.length +
      feedA.sidebarPosts.length +
      feedA.gridPosts.length,
    ALL_REFERENCE_POSTS.length
  );

  // Both feedA and feedB must always contain Steve Jobs & Bill Gates (featured-2) and Dell & Asus (featured-1)
  const feedAFeaturedIds = feedA.featuredPosts.map((p) => p.id);
  const feedBFeaturedIds = feedB.featuredPosts.map((p) => p.id);
  assert.ok(
    feedAFeaturedIds.includes('featured-2'),
    'Featured posts must include Steve Jobs & Bill Gates'
  );
  assert.ok(
    feedAFeaturedIds.includes('featured-1'),
    'Featured posts must include Dell & Asus'
  );
  assert.ok(
    feedBFeaturedIds.includes('featured-2'),
    'Featured posts in feedB must include Steve Jobs & Bill Gates'
  );
  assert.ok(
    feedBFeaturedIds.includes('featured-1'),
    'Featured posts in feedB must include Dell & Asus'
  );

  for (const post of [...feedA.featuredPosts, ...feedA.sidebarPosts]) {
    assert.equal(
      isPlaceholderReferencePost(post),
      false,
      `Placeholder post ${post.id} must not be featured or sidebar`
    );
  }

  const allIdsA = [
    ...feedA.featuredPosts,
    ...feedA.sidebarPosts,
    ...feedA.gridPosts,
  ].map((p) => p.id);
  assert.equal(new Set(allIdsA).size, ALL_REFERENCE_POSTS.length);

  // The remaining 2 posts in featured should vary across different seeds
  assert.notDeepEqual(
    feedAFeaturedIds,
    feedBFeaturedIds,
    'Different seeds should produce different random slots in featured sets'
  );

  assert.equal(PAGE_LOAD_REFERENCE_FEED.featuredPosts.length, 4);
  assert.equal(PAGE_LOAD_REFERENCE_FEED.sidebarPosts.length, 5);
  assert.ok(
    PAGE_LOAD_REFERENCE_FEED.featuredPosts.some((p) => p.id === 'featured-2')
  );
  assert.ok(
    PAGE_LOAD_REFERENCE_FEED.featuredPosts.some((p) => p.id === 'featured-1')
  );
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
  assert.equal(getReferencePostById('ch2-passion').id, 'ch2-passion');
});

test('visitor like toggle and name+comment validation work without authentication', () => {
  const post = FEATURED_REFERENCE_POSTS[0];
  let map = toggleArticleLike({}, post.id, VISITOR_ENGAGEMENT_ID);
  assert.equal(getEngagementForPost(map, post, VISITOR_ENGAGEMENT_ID).isLiked, true);
  assert.equal(getEngagementForPost(map, post, VISITOR_ENGAGEMENT_ID).likeCount, 1);

  map = toggleArticleLike(map, post.id, VISITOR_ENGAGEMENT_ID);
  assert.equal(getEngagementForPost(map, post, VISITOR_ENGAGEMENT_ID).isLiked, false);
  assert.equal(getEngagementForPost(map, post, VISITOR_ENGAGEMENT_ID).likeCount, 0);

  assert.equal(
    validateArticleCommentInput('', '   '),
    'Vui lòng nhập tên và nội dung bình luận.'
  );
  assert.equal(
    validateArticleCommentInput('   ', 'Nội dung hay'),
    'Vui lòng nhập tên của bạn.'
  );
  assert.equal(
    validateArticleCommentInput('Minh Tuấn', '   '),
    'Vui lòng nhập nội dung bình luận.'
  );
  assert.equal(validateArticleCommentInput('Minh Tuấn', 'Nội dung hay'), null);
});

test('editorial layouts and structured visual blocks cover all 5 styles while preserving default technical articles', () => {
  const layoutCounts = {
    default: 0,
    'magazine-dropcap': 0,
    'magazine-dossier': 0,
  };
  let pullQuoteCount = 0;
  let processDiagramCount = 0;
  let statSpotlightCount = 0;
  let comparisonCount = 0;

  for (const post of ALL_REFERENCE_POSTS) {
    const layout = post.layoutVariant ?? 'default';
    layoutCounts[layout] += 1;

    if (layout === 'magazine-dossier') {
      assert.ok(
        post.dossierSummary?.label && post.dossierSummary?.text,
        `${post.id} magazine-dossier must define dossierSummary`
      );
    }

    for (const block of post.bodyParagraphs) {
      if (typeof block === 'string') {
        continue;
      }
      if (block.type === 'pullQuote') {
        pullQuoteCount += 1;
        assert.ok(block.quote.trim().length > 0, `${post.id} pullQuote must have text`);
      } else if (block.type === 'processDiagram') {
        processDiagramCount += 1;
        assert.ok(block.title.trim().length > 0, `${post.id} processDiagram must have title`);
        assert.ok(block.steps.length >= 3, `${post.id} processDiagram must have >= 3 steps`);
      } else if (block.type === 'statSpotlight') {
        statSpotlightCount += 1;
        assert.ok(block.headline.trim().length > 0, `${post.id} statSpotlight must have headline`);
        assert.ok(block.label.trim().length > 0, `${post.id} statSpotlight must have label`);
      } else if (block.type === 'comparison') {
        comparisonCount += 1;
        assert.ok(block.goodTitle.trim().length > 0 && block.badTitle.trim().length > 0);
        assert.ok(block.pairs.length >= 2, `${post.id} comparison must have >= 2 pairs`);
      }
    }
  }

  assert.ok(layoutCounts.default >= 20, 'Technical/reference articles stay on default layout');
  assert.ok(layoutCounts['magazine-dropcap'] >= 4);
  assert.ok(layoutCounts['magazine-dossier'] >= 3);
  assert.ok(pullQuoteCount >= 4);
  assert.ok(processDiagramCount >= 8);
  assert.ok(statSpotlightCount >= 7);
  assert.ok(comparisonCount >= 5);

  const ch7Si = findReferencePostById('ch7-si-measurement');
  assert.equal(ch7Si?.layoutVariant ?? 'default', 'default');

  const commPost = findReferencePostById('ch8-communication-basics');
  assert.equal(commPost?.layoutVariant, 'magazine-dossier');
  assert.ok(
    commPost?.bodyParagraphs.some(
      (b) => typeof b !== 'string' && b.type === 'processDiagram'
    )
  );
});

test('no image is duplicated across distinct articles', () => {
  const imageOwnerMap = new Map<string, string[]>();

  for (const post of ALL_REFERENCE_POSTS) {
    const record = (src: string, location: string) => {
      if (!imageOwnerMap.has(src)) {
        imageOwnerMap.set(src, []);
      }
      imageOwnerMap.get(src)!.push(`${post.id} (${location})`);
    };

    record(post.imageSrc, 'hero');

    post.bodyParagraphs.forEach((block, idx) => {
      if (typeof block !== 'string') {
        if (block.type === 'figure') {
          record(block.src, `figure[${idx}]`);
        } else if (block.type === 'carousel') {
          block.slides.forEach((slide, sIdx) => {
            record(slide.src, `carousel[${idx}][${sIdx}]`);
          });
        }
      }
    });
  }

  for (const [src, locations] of imageOwnerMap.entries()) {
    const postIds = new Set(locations.map((loc) => loc.split(' ')[0]));
    assert.equal(
      postIds.size,
      1,
      `Image ${src} must be unique to one post, found in: ${locations.join(', ')}`
    );
  }
});

