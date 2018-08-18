import superagent from 'superagent';
import cheerio from 'cheerio';

export async function fetchDom(url: string): Promise<Cheerio> {
  const response = await superagent(url);
  if (!response.ok) {
    throw response;
  }
  return cheerio(response.text);
}

export async function fetchJson(url: string): Promise<{}> {
  const response = await superagent(url);
  return response.body;
}

interface downloadOptions {
  headers?: object,
  timeout?: number,
  onProgress?: (event: object) => void
}

export async function download(src: string, dest: string, options: downloadOptions = {}): Promise<{}> {
  const { headers = {}, timeout = 3000, onProgress = () => { } } = options;

  return new Promise((resolve, reject) => {
    superagent(src).set(headers).timeout({
      response: timeout
    }).on('progress', onProgress)
      .on('end', () => resolve())
      .on('error', () => reject())
  });
} 
