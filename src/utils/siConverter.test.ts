import test from 'node:test';
import assert from 'node:assert/strict';
import { evaluateSiInput, SI_EXAMPLES } from './siConverter';

test('evaluateSiInput returns empty for blank input', () => {
  assert.deepEqual(evaluateSiInput('   '), { kind: 'empty' });
});

test('evaluateSiInput converts speed 36 km/h to 10 m/s with velocity metadata', () => {
  const res = evaluateSiInput('36 km/h');
  assert.equal(res.kind, 'single');
  if (res.kind !== 'single') return;
  assert.equal(res.num, '10');
  assert.equal(res.unit, 'm/s');
  assert.equal(res.nameDesc, 'vận tốc');
  assert.equal(res.copyText, '10 m/s');
});

test('evaluateSiInput converts denominator chains and scientific notation accurately', () => {
  const res = evaluateSiInput('8,854×10^-12 C²/N·m²');
  assert.equal(res.kind, 'single');
  if (res.kind !== 'single') return;
  assert.equal(res.num, '8,854 × 10⁻¹²');
  assert.equal(res.unit, 'F/m');
  assert.equal(res.nameDesc, 'hằng số điện môi · C²/(N·m²)');
  assert.equal(res.baseUnitText, 's⁴·A²/(m³·kg)');
});

test('evaluateSiInput converts Vietnamese units, RPM, and offset temperatures', () => {
  const rpm = evaluateSiInput('1500 vòng/phút');
  assert.equal(rpm.kind, 'single');
  if (rpm.kind === 'single') {
    assert.equal(rpm.unit, 'rad/s');
  }

  const temp = evaluateSiInput('90 °F');
  assert.equal(temp.kind, 'single');
  if (temp.kind === 'single') {
    assert.equal(temp.unit, 'K');
    assert.equal(temp.offsetFormula, 'K = (°F + 459,67) × 5/9');
  }

  const mass = evaluateSiInput('3 tạ');
  assert.equal(mass.kind, 'single');
  if (mass.kind === 'single') {
    assert.equal(mass.num, '300');
    assert.equal(mass.unit, 'kg');
  }
});

test('evaluateSiInput sums compatible multi-quantities and lists incompatible ones', () => {
  const sameDim = evaluateSiInput('1 giờ 30 phút');
  assert.equal(sameDim.kind, 'multi');
  if (sameDim.kind === 'multi') {
    assert.equal(sameDim.rows.length, 2);
    assert.ok(sameDim.total);
    assert.equal(sameDim.total?.num, '5\u202f400');
    assert.equal(sameDim.total?.unit, 's');
    assert.equal(sameDim.copyText, '5\u202f400 s');
  }

  const diffDim = evaluateSiInput('8 kg 3 km');
  assert.equal(diffDim.kind, 'multi');
  if (diffDim.kind === 'multi') {
    assert.equal(diffDim.rows.length, 2);
    assert.equal(diffDim.total, null);
  }
});

test('evaluateSiInput handles invalid unit gracefully and supports all example chips', () => {
  const err = evaluateSiInput('12 foo');
  assert.equal(err.kind, 'error');
  if (err.kind === 'error') {
    assert.match(err.message, /foo/);
  }

  for (const example of SI_EXAMPLES) {
    const res = evaluateSiInput(example);
    assert.equal(res.kind, 'single', `Example "${example}" failed`);
  }
});
