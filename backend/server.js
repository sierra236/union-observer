import express from 'express';
import axios from 'axios';
import cors from 'cors';

const app = express();
app.use(cors());

const PORT = 4000;

app.get('/commits', async (req, res) => {
  const author = req.query.author;
  const url = 'https://api.github.com/repos/unionlabs/union/commits';

  try {
    const response = await axios.get(url, {
      params: author ? { author } : {},
      headers: {
        'User-Agent': 'UnionCommitsViewer',
      },
    });

    res.json(response.data);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'GitHub API error.' });
  }
});

app.listen(PORT, () => {
  console.log(`Backend running on http://localhost:${PORT}`);
});
