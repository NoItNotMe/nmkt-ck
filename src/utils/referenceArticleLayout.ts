import { type ArticleContentBlock } from './referencePosts';

export type ArticleBodySegment =
  | {
      kind: 'prose-run';
      startIndex: number;
      paragraphs: readonly string[];
      useTwoColumns: boolean;
      hasDropCap: boolean;
    }
  | {
      kind: 'block';
      index: number;
      block: ArticleContentBlock;
    };

function isPlainProseParagraph(block: ArticleContentBlock): block is string {
  return (
    typeof block === 'string' &&
    block !== '---' &&
    !block.startsWith('### ') &&
    !block.startsWith('> ')
  );
}

export function groupArticleBodySegments(
  blocks: readonly ArticleContentBlock[],
  isMagazineLayout: boolean
): ArticleBodySegment[] {
  if (!isMagazineLayout) {
    return blocks.map((block, index) => ({
      kind: 'block',
      index,
      block,
    }));
  }

  const segments: ArticleBodySegment[] = [];
  let proseBuffer: string[] = [];
  let proseStartIndex = 0;
  let assignedDropCap = false;

  const flushProse = () => {
    if (proseBuffer.length === 0) {
      return;
    }
    const paragraphs = [...proseBuffer];
    const totalLength = paragraphs.reduce((sum, p) => sum + p.length, 0);
    const hasDropCap = !assignedDropCap && paragraphs[0].trim().length >= 40;
    if (hasDropCap) {
      assignedDropCap = true;
    }
    segments.push({
      kind: 'prose-run',
      startIndex: proseStartIndex,
      paragraphs,
      useTwoColumns: paragraphs.length >= 2 && totalLength >= 320,
      hasDropCap,
    });
    proseBuffer = [];
  };

  blocks.forEach((block, index) => {
    if (isPlainProseParagraph(block)) {
      if (proseBuffer.length === 0) {
        proseStartIndex = index;
      }
      proseBuffer.push(block);
    } else {
      flushProse();
      segments.push({
        kind: 'block',
        index,
        block,
      });
    }
  });

  flushProse();
  return segments;
}
