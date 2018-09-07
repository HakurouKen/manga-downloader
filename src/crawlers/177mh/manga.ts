import cheerio from 'cheerio';
import BaseManga from '../../base/manga';
import { getChapterInfoFromAnchor } from '../../utils/misc';
import { ChapterInfo } from '../../utils/types';

function getChapters($el: Cheerio): ChapterInfo[] {
  return $el
    .find('li a')
    .toArray()
    .map(el => getChapterInfoFromAnchor(el, 'https://177mh.net'));
}

export default class Manga177mh extends BaseManga {
  async getInfo() {
    const $ = await this.$();
    const $infos = $('ul.ar_list_coc li');

    return {
      name: $infos
        .find('h1')
        .text()
        .trim(),
      url: this.url,
      cover: $('.ar_list_coc dt img').attr('src'),
      authors: [
        $infos
          .eq(1)
          .find('a')
          .text(),
      ],
      end: /完/.test($infos.eq(2).text()),
      description: $('#det')
        .text()
        .trim(),
      chapters: getChapters($('[id="ar_list_normal ar_rlos_bor"]').slice(1)),
      otherVersions: $('[id="ar_list_other"]')
        .toArray()
        .map((el) => {
          const $el = cheerio(el);
          return {
            name: $el.find('h2').text(),
            chapters: getChapters($el),
          };
        }),
    };
  }
}
