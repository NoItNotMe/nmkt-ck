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
      ['Điều Khiển và Tự Động Hóa', 'right'],
      ['Kỹ Thuật Điện', 'left'],
      ['Điện Tử - Viễn Thông', 'right'],
      ['Thiết Kế Vi Mạch', 'left'],
    ]
  );

  for (const section of HOME_SUBSECTIONS) {
    assert.equal(section.title.includes('Phần'), false);
    assert.ok(section.bullets.length >= 3);
    assert.ok(section.detailHighlights.length >= 2);
    assert.ok(section.imageSrc.startsWith('/assets/aistudio/'));
  }

  assert.ok(getSubsectionById('part-2')?.detailLead.includes('PLC và Hệ thống SCADA'));
  assert.ok(getSubsectionById('part-3')?.detailLead.includes('lưới điện thông minh'));
  assert.ok(getSubsectionById('part-4')?.detailLead.includes('hệ thống trên chip SoC'));
  assert.ok(
    getSubsectionById('part-5')?.detailLead.includes(
      'Trường Đại học Bách khoa - ĐHQG-HCM'
    )
  );

  assert.equal(
    getSubsectionById('part-2')?.imageSrc,
    '/assets/aistudio/64_TSDH_TQImage_1691462323202_cb32d264.jpg'
  );
  assert.equal(
    getSubsectionById('part-3')?.imageSrc,
    '/assets/aistudio/63_TSDH_TQImage_1691461428936_a5a8ebc8.jpg'
  );
  assert.equal(
    getSubsectionById('part-4')?.imageSrc,
    '/assets/aistudio/65_TSDH_Image_1691466014493_fa7a55dc.jpg'
  );
  assert.equal(
    getSubsectionById('part-5')?.imageSrc,
    '/assets/aistudio/181_TSDH_TQImage_1715675275938_b30b1bdc.jpg'
  );

  assert.equal(
    getSubsectionById('part-2')?.curriculumUrl,
    'https://drive.google.com/file/d/1PDvmMvl22gf8nnv5yKRVgPe4e-k08lQX/view'
  );
  assert.equal(
    getSubsectionById('part-3')?.curriculumUrl,
    'https://drive.google.com/file/d/12O3wGmPDt_2ofDnEuPTOdvIwcKU4AsmI/view'
  );
  assert.equal(
    getSubsectionById('part-4')?.curriculumUrl,
    'https://drive.google.com/file/d/1eH_Qy-mf7c4fT0UEi7nhr17LiBqTgayL/view'
  );
  assert.equal(
    getSubsectionById('part-5')?.curriculumUrl,
    'https://drive.google.com/file/d/1nKW83RR3SWzR-yJe5JQpILm-wOprFCJ-/view'
  );

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
