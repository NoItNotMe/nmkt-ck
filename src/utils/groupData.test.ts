import test from 'node:test';
import assert from 'node:assert/strict';
import { PLACEHOLDER_ITEMS } from './groupData';

test('PLACEHOLDER_ITEMS contains exactly 9 items (4 existing + 5 new placeholder items)', () => {
  assert.equal(PLACEHOLDER_ITEMS.length, 9);
});

test('PLACEHOLDER_ITEMS has unique ids from muc-1 through muc-9', () => {
  const ids = PLACEHOLDER_ITEMS.map((item) => item.id);
  assert.deepEqual(ids, [
    'muc-1',
    'muc-2',
    'muc-3',
    'muc-4',
    'muc-5',
    'muc-6',
    'muc-7',
    'muc-8',
    'muc-9',
  ]);
  const uniqueIds = new Set(ids);
  assert.equal(uniqueIds.size, 9);
});

test('Each placeholder item has a non-empty title and valid chapter subtitle', () => {
  PLACEHOLDER_ITEMS.forEach((item, index) => {
    assert.ok(item.title.length > 0, `Item ${item.id} has empty title`);
    assert.ok(item.subtitle, `Item ${item.id} is missing subtitle`);
    assert.match(
      item.subtitle,
      new RegExp(`^Chương ${index + 1}:`),
      `Item ${item.id} subtitle "${item.subtitle}" should start with Chương ${index + 1}`
    );
  });
});

test('Newly added items 5-9 have descriptive titles and subtitles', () => {
  assert.equal(PLACEHOLDER_ITEMS[4].id, 'muc-5');
  assert.equal(PLACEHOLDER_ITEMS[4].title, 'Hỗ trợ phân công');
  assert.equal(PLACEHOLDER_ITEMS[4].subtitle, 'Chương 5: Kỹ năng làm việc nhóm');

  assert.equal(PLACEHOLDER_ITEMS[5].id, 'muc-6');
  assert.equal(PLACEHOLDER_ITEMS[5].title, 'Hướng dẫn giải quyết vấn đề');
  assert.equal(
    PLACEHOLDER_ITEMS[5].subtitle,
    'Chương 6: Kỹ năng giải quyết vấn đề'
  );

  assert.equal(PLACEHOLDER_ITEMS[6].id, 'muc-7');
  assert.equal(PLACEHOLDER_ITEMS[6].title, 'Quy đổi đơn vị về hệ SI');
  assert.equal(PLACEHOLDER_ITEMS[6].subtitle, 'Chương 7: Cơ sở kỹ thuật');

  assert.equal(PLACEHOLDER_ITEMS[7].id, 'muc-8');
  assert.equal(PLACEHOLDER_ITEMS[7].title, 'Chữa slide');
  assert.equal(PLACEHOLDER_ITEMS[7].subtitle, 'Chương 8: Giao tiếp trong kỹ thuật');

  assert.equal(PLACEHOLDER_ITEMS[8].id, 'muc-9');
  assert.equal(PLACEHOLDER_ITEMS[8].title, 'Tình huống đạo đức');
  assert.equal(PLACEHOLDER_ITEMS[8].subtitle, 'Chương 9: Đạo đức nghề nghiệp');
});

test('Item 3 (muc-3) is named "Một ngày của bạn"', () => {
  const muc3 = PLACEHOLDER_ITEMS.find((item) => item.id === 'muc-3');
  assert.ok(muc3);
  assert.equal(muc3.title, 'Một ngày của bạn');
  assert.equal(muc3.subtitle, 'Chương 3: Quản lý thời gian hiệu quả');
});
