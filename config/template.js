const {name} = yo;
const html = `<!DOCTYPE html>
<html data-page="${name}">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width,minimum-scale=1.0,maximum-scale=1.0">
    <title>${name}</title>
</head>
<body>
${name}
</body>
</html>`;

const js = `import './${name}.scss'
// ------ 业务逻辑
// ------
// 热更新设置
if(module.hot){
    require('./${name}.html')
    module.hot.accept();
    module.hot.decline('./${name}.html')
}`;

const css = `@import '../../common/style/all.scss'`;

module.exports = {
    [name + '.html']: html,
    [name + '.scss']: css,
    [name + '.js']: js
}