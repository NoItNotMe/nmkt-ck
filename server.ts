import path from 'node:path';
import express from 'express';
import { GroupStoreError, TeamGroupStore } from './server/groupStore.ts';

const PORT = Number(process.env.PORT) || 3000;
const isProduction = process.env.NODE_ENV === 'production';

async function startServer() {
  const app = express();
  const dataFile = path.resolve(process.cwd(), 'data', 'assignment-groups.json');
  const store = new TeamGroupStore(dataFile);

  app.disable('x-powered-by');
  app.use(express.json({ limit: '32kb' }));

  // Create a new When2Meet-style group with a single code
  app.post('/api/assignment-groups', (req, res) => {
    try {
      const body = req.body && typeof req.body === 'object' ? req.body : {};
      const rawName = typeof body.name === 'string' ? body.name : undefined;
      const rawCode = typeof body.code === 'string' ? body.code : undefined;
      const group = store.createGroup(rawName, rawCode);
      res.status(201).json({ group });
    } catch (err) {
      if (err instanceof GroupStoreError) {
        res.status(err.statusCode).json({ error: err.message });
        return;
      }
      res.status(500).json({ error: 'Không thể tạo nhóm mới.' });
    }
  });

  // Fetch an existing group by its code
  app.get('/api/assignment-groups/:code', (req, res) => {
    const group = store.getGroup(req.params.code);
    if (!group) {
      res.status(404).json({
        error: 'Không tìm thấy nhóm với mã này. Hãy kiểm tra lại mã nhóm.',
      });
      return;
    }
    res.json({ group });
  });

  // Join or update a member's skills inside a group
  app.put('/api/assignment-groups/:code/member', (req, res) => {
    try {
      const body = req.body && typeof req.body === 'object' ? req.body : {};
      const memberName = typeof body.name === 'string' ? body.name : '';
      const result = store.upsertMember(
        req.params.code,
        memberName,
        body.skills
      );
      res.json(result);
    } catch (err) {
      if (err instanceof GroupStoreError) {
        res.status(err.statusCode).json({ error: err.message });
        return;
      }
      res.status(500).json({ error: 'Không thể lưu kỹ năng thành viên.' });
    }
  });

  // Remove a member from a group
  app.delete('/api/assignment-groups/:code/member/:memberId', (req, res) => {
    try {
      const group = store.removeMember(req.params.code, req.params.memberId);
      res.json({ group });
    } catch (err) {
      if (err instanceof GroupStoreError) {
        res.status(err.statusCode).json({ error: err.message });
        return;
      }
      res.status(500).json({ error: 'Không thể xóa thành viên.' });
    }
  });

  app.use(express.static(path.resolve(process.cwd(), 'public')));

  if (!isProduction) {
    const { createServer: createViteServer } = await import('vite');
    const vite = await createViteServer({
      server: {
        middlewareMode: true,
        hmr: process.env.DISABLE_HMR !== 'true',
      },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    const distDir = path.resolve(process.cwd(), 'dist');
    app.use(express.static(distDir));
    app.get('*', (_req, res) => {
      res.sendFile(path.join(distDir, 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`Server listening on http://0.0.0.0:${PORT}`);
  });
}

startServer().catch((err) => {
  console.error('Failed to start server:', err);
  process.exit(1);
});
