import test from 'node:test';
import assert from 'node:assert/strict';
import {
  formatMemberLine,
  getDetailStageIndexForId,
  getSubsectionById,
  HOME_HERO_CONTENT,
  HOME_SUBSECTIONS,
  SCROLL_STAGES,
} from './homeSections';

test('HOME_HERO_CONTENT matches required title, subtitle, note, and 4 members', () => {
  assert.equal(HOME_HERO_CONTENT.title, 'NHẬP MÔN KỸ THUẬT');
  assert.equal(HOME_HERO_CONTENT.subtitle, 'Điện - điện tử');
  assert.equal(HOME_HERO_CONTENT.note, 'Nhóm 3, L08, HK261, HCMUT');
  assert.equal(
    formatMemberLine(HOME_HERO_CONTENT.members),
    'Vũ Duy Mạnh - Hoàng Ngọc Minh - Nguyễn Minh Tân - Nguyễn Quang Tiến'
  );
});

test('HOME_SUBSECTIONS defines 4 alternating sections without "Phần" prefix', () => {
  assert.deepEqual(
    HOME_SUBSECTIONS.map((section) => [section.title, section.imageSide]),
    [
      ['Tự Động Hóa', 'right'],
      ['Kỹ Thuật Điện', 'left'],
      ['Điện Tử - Viễn Thông', 'right'],
      ['Thiết Kế Vi Mạch', 'left'],
    ]
  );

  for (const section of HOME_SUBSECTIONS) {
    assert.equal(section.title.includes('Phần'), false);
    assert.ok(section.bullets.length >= 3);
    assert.ok(section.detailHighlights.length >= 3);
    assert.ok(section.imageSrc.startsWith('/src/assets/images/'));
  }

  assert.equal(getSubsectionById('part-4')?.title, 'Điện Tử - Viễn Thông');
  assert.equal(getSubsectionById(null), undefined);
});

test('SCROLL_STAGES progresses directly from overview through all four specializations', () => {
  assert.deepEqual(
    SCROLL_STAGES.map((stage) =>
      stage.mode === 'overview' ? 'overview' : stage.activeId
    ),
    ['overview', 'part-2', 'part-3', 'part-4', 'part-5']
  );
  assert.equal(getDetailStageIndexForId('part-2'), 1);
  assert.equal(getDetailStageIndexForId('part-3'), 2);
  assert.equal(getDetailStageIndexForId('part-4'), 3);
  assert.equal(getDetailStageIndexForId('part-5'), 4);
});
