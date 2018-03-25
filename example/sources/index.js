const glob = require('glob');
const path = require('path');

glob.sync('./example/sources/*.js').forEach(file => {
    const name = path.basename(file, '.js');
    if (name !== 'index') {
        exports[name] = require(path.resolve(file));
    }
});
