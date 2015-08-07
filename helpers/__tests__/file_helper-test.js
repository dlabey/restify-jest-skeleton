jest.dontMock('../file_helper');

var fileHelper = require('../file_helper');

describe('File Helper readdirRecursSync()', function () {
  it('reads a directory recursively', function () {
    var files = fileHelper.readdirRecursSync(__dirname + '/../');
    var hasFileHelperTest = files.indexOf(__filename) > -1;

    expect(hasFileHelperTest).toBeTruthy();
  });
});
