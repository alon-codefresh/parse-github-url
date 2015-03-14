'use strict';

/* deps:mocha */
var assert = require('assert');
var gh = require('./');
var o;

describe('parse-github-url', function () {
  it('should get the user:', function () {
    assert.equal(gh(''), null);
    assert.equal(gh('assemble/verb#branch').user, 'assemble');
    assert.equal(gh('assemble/verb#dev').user, 'assemble');
    assert.equal(gh('assemble/verb').user, 'assemble');
    assert.equal(gh('git+https://github.com/assemble/verb.git').user, 'assemble');
    assert.equal(gh('git+ssh://github.com/assemble/verb.git').user, 'assemble');
    assert.equal(gh('git://gh.pages.com/assemble/verb.git').user, 'assemble');
    assert.equal(gh('git://github.com/assemble/verb').user, 'assemble');
    assert.equal(gh('git://github.com/assemble/verb.git').user, 'assemble');
    assert.equal(gh('git://github.com/foo/bar.git').user, 'foo');
    assert.equal(gh('git://github.one.com/assemble/verb.git').user, 'assemble');
    assert.equal(gh('git://github.one.two.com/assemble/verb.git').user, 'assemble');
    assert.equal(gh('git@gh.pages.com:assemble/verb.git').user, 'assemble');
    assert.equal(gh('git@gist.github.com:9284722.git'), null);
    assert.equal(gh('git@github.com:assemble/verb.git#0.6.0').user, 'assemble');
    assert.equal(gh('git@github.com:assemble/verb.git#v0.6.0').user, 'assemble');
    assert.equal(gh('git@github.com:assemble/verb.git').user, 'assemble');
    assert.equal(gh('github:user/repo').user, 'user');
    assert.equal(gh('http://github.com/assemble/verb').user, 'assemble');
    assert.equal(gh('http://github.com/assemble/verb.git').user, 'assemble');
    assert.equal(gh('http://github.com/assemble/verb/tree').user, 'assemble');
    assert.equal(gh('http://github.com/assemble/verb/tree/master').user, 'assemble');
    assert.equal(gh('http://github.com/assemble/verb/tree/master/foo/bar').user, 'assemble');
    assert.equal(gh('https://assemble@github.com/assemble/verb.git').user, 'assemble');
    assert.equal(gh('https://foo.github.com/assemble/verb/bar.tar.gz').user, 'assemble');
    assert.equal(gh('https://foo.github.com/assemble/verb/bar.zip').user, 'assemble');
    assert.equal(gh('https://gh.pages.com/assemble/verb.git').user, 'assemble');
    assert.equal(gh('https://gist.github.com/9284722.git'), null);
    assert.equal(gh('https://github.com/assemble/verb').user, 'assemble');
    assert.equal(gh('https://github.com/assemble/verb.git').user, 'assemble');
    assert.equal(gh('https://github.com/assemble/verb/blob/249b21a86400b38969cee3d5df6d2edf8813c137/README.md').user, 'assemble');
    assert.equal(gh('https://github.com/assemble/verb/blob/master/assemble/index.js').user, 'assemble');
    assert.equal(gh('https://github.com/assemble/verb/blob/master/foo/index.js').user, 'assemble');
    assert.equal(gh('https://github.com/assemble/verb/blob/v1.0.0/README.md').user, 'assemble');
    assert.equal(gh('https://github.com/assemble/verb/tree/0.2.0').user, 'assemble');
    assert.equal(gh('https://github.com/assemble/verb/tree/dev').user, 'assemble');
    assert.equal(gh('https://github.com/assemble/verb/tree/feature/dev').user, 'assemble');
    assert.equal(gh('https://github.com/repos/assemble/verb/tarball').user, 'assemble');
    assert.equal(gh('https://github.com/repos/assemble/verb/zipball').user, 'assemble');
    assert.equal(gh(), null);
    assert.equal(gh(null), null);
    assert.equal(gh(undefined), null);
  });
  it('should get the branch:', function () {
    assert.equal(gh('assemble/verb#branch').branch, 'branch');
    assert.equal(gh('assemble/verb#dev').branch, 'dev');
    assert.equal(gh('git@github.com:assemble/verb.git#0.6.0').branch, '0.6.0');
    assert.equal(gh('git@github.com:assemble/verb.git#v0.6.0').branch, 'v0.6.0');
    assert.equal(gh('https://github.com/assemble/verb/blob/foo/README.md').branch, 'foo');
    assert.equal(gh('https://github.com/assemble/verb/tree/dev').branch, 'dev');
    assert.equal(gh('https://github.com/assemble/verb/tree/feature/dev').branch, 'feature/dev');
    assert.equal(gh('https://github.com/assemble/verb/tree/foo').branch, 'foo');
  });
  it('should use master branch when another branch is not defined:', function () {
    assert.equal(gh('assemble/verb').branch, 'master');
    assert.equal(gh('git://github.com/foo/bar.git').branch, 'master');
    assert.equal(gh('git@github.com:assemble/verb.git').branch, 'master');
    assert.equal(gh('github:assemble/verb').branch, 'master');
    assert.equal(gh('http://github.com/assemble/verb/tree/master').branch, 'master');
    assert.equal(gh('http://github.com/assemble/verb/tree/master/foo/bar').branch, 'master/foo/bar');
    assert.equal(gh('https://github.com/assemble/verb').branch, 'master');
    assert.equal(gh('https://github.com/assemble/verb/blob/master/foo/index.js').branch, 'master');
  });
  it('should get a full repo path:', function () {
    assert.equal(gh('assemble/verb#dev').repopath, 'assemble/verb');
    assert.equal(gh('assemble/verb').repopath, 'assemble/verb');
    assert.equal(gh('git+https://github.com/assemble/verb.git').repopath, 'assemble/verb');
    assert.equal(gh('git+ssh://github.com/assemble/verb.git').repopath, 'assemble/verb');
    assert.equal(gh('git://github.com/assemble/verb').repopath, 'assemble/verb');
    assert.equal(gh('git://github.com/assemble/verb.git').repopath, 'assemble/verb');
    assert.equal(gh('git://github.one.com/assemble/verb.git').repopath, 'assemble/verb');
    assert.equal(gh('git://github.one.two.com/assemble/verb.git').repopath, 'assemble/verb');
  });
  it('should know when repo is not defined:', function () {
    assert.equal(gh('git+https://github.com/assemble').repo, null);
    assert.equal(gh('git+https://github.com/assemble').repopath, null);
    assert.equal(gh('git+https://github.com/assemble').user, 'assemble');
    assert.equal(gh('git+ssh://github.com/assemble').repo, null);
    assert.equal(gh('git+ssh://github.com/assemble').repopath, null);
    assert.equal(gh('git+ssh://github.com/assemble').user, 'assemble');
    assert.equal(gh('git://github.com/assemble').repo, null);
    assert.equal(gh('git://github.com/assemble').repopath, null);
    assert.equal(gh('git://github.com/assemble').user, 'assemble');
    assert.equal(gh('git://github.one.com/assemble').repo, null);
    assert.equal(gh('git://github.one.com/assemble').repopath, null);
    assert.equal(gh('git://github.one.com/assemble').user, 'assemble');
    assert.equal(gh('git://github.one.two.com/assemble').repo, null);
    assert.equal(gh('git://github.one.two.com/assemble').repopath, null);
    assert.equal(gh('git://github.one.two.com/assemble').user, 'assemble');
    assert.equal(gh('http://github.com/assemble').repo, null);
    assert.equal(gh('http://github.com/assemble').repopath, null);
    assert.equal(gh('http://github.com/assemble').user, 'assemble');
  });
  it('should get the repo:', function () {
    assert.equal(gh('assemble/verb#branch').repo, 'verb');
    assert.equal(gh('assemble/verb#dev').repo, 'verb');
    assert.equal(gh('assemble/verb').repo, 'verb');
    assert.equal(gh('git+https://github.com/assemble/verb.git').repo, 'verb');
    assert.equal(gh('git+ssh://github.com/assemble/verb.git').repo, 'verb');
    assert.equal(gh('git://gh.pages.com/assemble/verb.git').repo, 'verb');
    assert.equal(gh('git://github.com/assemble/verb').repo, 'verb');
    assert.equal(gh('git://github.com/assemble/verb.git').repo, 'verb');
    assert.equal(gh('git://github.com/foo/bar.git').repo, 'bar');
    assert.equal(gh('git://github.one.com/assemble/verb.git').repo, 'verb');
    assert.equal(gh('git://github.one.two.com/assemble/verb.git').repo, 'verb');
    assert.equal(gh('git@gh.pages.com:assemble/verb.git').repo, 'verb');
    assert.equal(gh('git@github.com:assemble/verb.git#0.6.0').repo, 'verb');
    assert.equal(gh('git@github.com:assemble/verb.git#v0.6.0').repo, 'verb');
    assert.equal(gh('git@github.com:assemble/verb.git').repo, 'verb');
    assert.equal(gh('github:assemble/verb').repo, 'verb');
    assert.equal(gh('http://github.com/assemble/verb').repo, 'verb');
    assert.equal(gh('http://github.com/assemble/verb.git').repo, 'verb');
    assert.equal(gh('http://github.com/assemble/verb/tree').repo, 'verb');
    assert.equal(gh('http://github.com/assemble/verb/tree/master').repo, 'verb');
    assert.equal(gh('http://github.com/assemble/verb/tree/master/foo/dev').repo, 'verb');
    assert.equal(gh('https://assemble.github.io/assemble/verb/dev.tar.gz').repo, 'verb');
    assert.equal(gh('https://assemble.github.io/assemble/verb/dev.zip').repo, 'verb');
    assert.equal(gh('https://assemble@github.com/assemble/verb.git').repo, 'verb');
    assert.equal(gh('https://gh.pages.com/assemble/verb.git').repo, 'verb');
    assert.equal(gh('https://github.com/assemble/verb').repo, 'verb');
    assert.equal(gh('https://github.com/assemble/verb.git').repo, 'verb');
    assert.equal(gh('https://github.com/assemble/verb/blob/249b21a86400b38969cee3d5df6d2edf8813c137/README.md').repo, 'verb');
    assert.equal(gh('https://github.com/assemble/verb/blob/master/foo/index.js').repo, 'verb');
    assert.equal(gh('https://github.com/repos/assemble/verb/tarball').repo, 'verb');
    assert.equal(gh('https://github.com/repos/assemble/verb/zipball').repo, 'verb');
  });
});