import path from 'path';
import fs from 'fs';
import rimraf from 'rimraf';

import Chapter from 'crawlers/verydm/chapter';

describe('Verydm', () => {
  describe('Chapter#download', function () {
    const TEST_DIR = 'manga/狼与香辛料/番外篇';
    beforeEach((done) => {
      rimraf(TEST_DIR, () => {
        done();
      });
    });

    this.timeout(120 * 1e3);

    it('should download the manga chapter', async () => {
      const chapter = new Chapter('http://www.verydm.com/chapter.php?id=15677');
      await chapter.download(path.join(TEST_DIR, '{autoIndex}{suffix}'));
      // check the first image
      fs.existsSync(path.join(TEST_DIR, '01.jpg')).should.be.true();
      // check the last image
      fs.existsSync(path.join(TEST_DIR, '04.jpg')).should.be.true();
      // should not contain file that not belongs to this chapter
      fs.existsSync(path.join(TEST_DIR, '05.jpg')).should.be.false();
    });
  });
});