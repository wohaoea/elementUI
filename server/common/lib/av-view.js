/**
 * Created by xiongze on 2016/9/8.
 */
const avalon = require('avalon2');
const fs = require("fs")
const Path = require('path');

function avRender(path, data, option) {
    return function (done) {
        fs.readFile(path, 'utf-8', function (err,result) {
            if (err) return done(err);
            done(null, result);
        });
    }
}


module.exports = function (app, option) {
    var views = option.views;
    var extname = option.extname || 'html';

    function *render(path, data, opt) {
        var html = yield avRender(Path.resolve(views, path + '.' + extname), data, option);
        if (!opt || opt.write !== false) {
            this.type = 'html';
            this.body = html;
        }
        return html;
    }

    app.context.render = render;
    return app;
};