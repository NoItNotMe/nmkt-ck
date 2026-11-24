import test from 'node:test';
import assert from 'node:assert/strict';
import { groupArticleBodySegments } from './referenceArticleLayout';
import { type ArticleContentBlock } from './referencePosts';

test('groupArticleBodySegments returns raw block entries when isMagazineLayout is false', () => {
  const blocks: ArticleContentBlock[] = [
    'Đoạn văn thứ nhất đủ dài để kiểm tra cách chia đoạn.',
    'Đoạn văn thứ hai tiếp nối ngay sau đó.',
    '---',
    '### Tiêu đề mục',
  ];

  const segments = groupArticleBodySegments(blocks, false);
  assert.equal(segments.length, 4);
  assert.ok(segments.every((seg) => seg.kind === 'block'));
});

test('groupArticleBodySegments groups consecutive prose runs, sets drop cap on first substantive run, and enables 2 columns for long runs', () => {
  const longP1 =
    'Một đoạn văn bản mở đầu đủ dài hơn hai trăm ký tự để bảo đảm tổng độ dài của hai đoạn văn bản liên tiếp vượt qua ngưỡng ba trăm hai mươi ký tự khi trình bày theo kiểu tạp chí chuyên sâu trên màn hình rộng.';
  const longP2 =
    'Đoạn văn bản thứ hai tiếp tục phân tích bối cảnh lịch sử kỹ thuật với hơn một trăm năm mươi ký tự bổ sung để kiểm chứng khả năng tự động chia hai cột.';
  const shortAfter = 'Đoạn ngắn độc lập sau tiêu đề.';

  const blocks: ArticleContentBlock[] = [
    '> Trích dẫn mở đầu',
    '---',
    longP1,
    longP2,
    '### Chương tiếp theo',
    {
      type: 'pullQuote',
      quote: 'Một câu nói nổi bật.',
    },
    shortAfter,
  ];

  const segments = groupArticleBodySegments(blocks, true);
  assert.equal(segments.length, 6);

  assert.equal(segments[0]?.kind, 'block');
  assert.equal(segments[1]?.kind, 'block');

  const firstProse = segments[2];
  assert.equal(firstProse?.kind, 'prose-run');
  if (firstProse?.kind === 'prose-run') {
    assert.equal(firstProse.startIndex, 2);
    assert.equal(firstProse.paragraphs.length, 2);
    assert.equal(firstProse.hasDropCap, true);
    assert.equal(firstProse.useTwoColumns, true);
  }

  assert.equal(segments[3]?.kind, 'block');
  assert.equal(segments[4]?.kind, 'block');

  const secondProse = segments[5];
  assert.equal(secondProse?.kind, 'prose-run');
  if (secondProse?.kind === 'prose-run') {
    assert.equal(secondProse.hasDropCap, false);
    assert.equal(secondProse.useTwoColumns, false);
  }
});
