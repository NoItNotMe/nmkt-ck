import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';
import {
  AI_ASSISTANTS,
  PROBLEM_SOLVING_DIAGRAMS,
  SUGGESTED_PROMPTS,
} from './problemSolvingGuide';

test('AI_ASSISTANTS contains exactly 3 assistants with valid URLs', () => {
  assert.equal(AI_ASSISTANTS.length, 3);
  const ids = AI_ASSISTANTS.map((a) => a.id);
  assert.deepEqual(ids, ['chatgpt', 'claude', 'gemini']);

  const chatgpt = AI_ASSISTANTS.find((a) => a.id === 'chatgpt');
  assert.ok(chatgpt);
  assert.equal(chatgpt.url, 'https://chatgpt.com');

  const claude = AI_ASSISTANTS.find((a) => a.id === 'claude');
  assert.ok(claude);
  assert.equal(claude.url, 'https://claude.ai');

  const gemini = AI_ASSISTANTS.find((a) => a.id === 'gemini');
  assert.ok(gemini);
  assert.equal(gemini.url, 'https://gemini.google.com');

  for (const assistant of AI_ASSISTANTS) {
    assert.ok(assistant.name.length > 0);
    assert.ok(assistant.badge.length > 0);
    assert.ok(assistant.logoSrc.length > 0);
    const relativePublicPath = assistant.logoSrc.replace(/^\/+/, '');
    const absoluteDiskPath = path.resolve(
      process.cwd(),
      'public',
      relativePublicPath.replace(/^public\//, '')
    );
    assert.ok(
      fs.existsSync(absoluteDiskPath),
      `Logo file ${assistant.logoSrc} must exist at ${absoluteDiskPath}`
    );
  }
});

test('PROBLEM_SOLVING_DIAGRAMS contains exactly 4 diagrams with images existing on disk', () => {
  assert.equal(PROBLEM_SOLVING_DIAGRAMS.length, 4);
  const ids = PROBLEM_SOLVING_DIAGRAMS.map((d) => d.id);
  assert.deepEqual(ids, ['5w1h', 'fishbone', 'scamper', 'six-hats']);

  for (const diagram of PROBLEM_SOLVING_DIAGRAMS) {
    assert.ok(diagram.title.length > 0);
    assert.ok(diagram.subtitle.length > 0);
    assert.ok(diagram.alt.length > 0);
    assert.ok(diagram.description.length > 0);

    const relativePublicPath = diagram.src.replace(/^\/+/, '');
    const absoluteDiskPath = path.resolve(process.cwd(), 'public', relativePublicPath.replace(/^public\//, ''));
    assert.ok(
      fs.existsSync(absoluteDiskPath),
      `Image file ${diagram.src} must exist at ${absoluteDiskPath}`
    );
  }
});

test('SUGGESTED_PROMPTS contains non-empty engineering problem solving prompts', () => {
  assert.ok(SUGGESTED_PROMPTS.length >= 3);
  for (const item of SUGGESTED_PROMPTS) {
    assert.ok(item.label.length > 0);
    assert.ok(item.prompt.length > 0);
  }
});
