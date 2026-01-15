const pptxgen = require('pptxgenjs');
const html2pptx = require('./html2pptx.js');
const path = require('path');

async function createAnthropicSkillsPresentation() {
    console.log('开始创建Anthropic技能框架分析演示文稿...');

    // 创建演示文稿
    const pptx = new pptxgen();

    // 设置16:9布局以匹配HTML dimensions (720pt × 405pt)
    pptx.layout = 'LAYOUT_16x9';

    // 演示文稿元数据
    pptx.author = 'Claude Code Analysis Team';
    pptx.title = '技能范式：Anthropic在Claude Code中全新智能体框架的深度解析';
    pptx.subject = 'Anthropic Skills Framework Analysis';
    pptx.company = 'Anthropic';

    // 定义幻灯片文件列表 - 按顺序
    const slideFiles = [
        'slide-01-title.html',
        'slide-02-core-thesis.html',
        'slide-03-architecture.html',
        'slide-04-skill-md.html',
        'slide-05-progressive-disclosure.html',
        'slide-06-model-invoked.html',
        'slide-07-dev-workflow.html',
        'slide-08-workflow-value.html',
        'slide-09-strategic-efficiency.html',
        'slide-10-strategic-philosophy.html',
        'slide-11-comparison-table.html',
        'slide-12-strategic-bet.html',
        'slide-13-security-attack-surface.html',
        'slide-14-security-threat-model.html',
        'slide-15-enterprise-adoption.html',
        'slide-16-long-term-vision.html',
        'slide-17-conclusions.html',
        'slide-18-final-thoughts.html',
        'slide-19-thanks.html'
    ];

    console.log(`找到 ${slideFiles.length} 个HTML幻灯片文件`);

    // 定义Anthropic品牌色彩 (注意：不使用#前缀)
    const colors = {
        dark: '141413',      // Dark (Primary Text)
        light: 'faf9f5',     // Light (Background)
        orange: 'd97757',    // Orange (Primary)
        blue: '6a9bcc',      // Blue (Secondary)
        green: '788c5d'      // Green (Tertiary)
    };

    // 添加每个幻灯片
    for (let i = 0; i < slideFiles.length; i++) {
        const slideFile = slideFiles[i];
        const slideNumber = i + 1;

        console.log(`处理幻灯片 ${slideNumber}: ${slideFile}`);

        try {
            // 使用html2pptx转换HTML文件
            const result = await html2pptx(slideFile, pptx, {
                tmpDir: '/tmp'
            });

            console.log(`✓ 幻灯片 ${slideNumber} 转换成功`);

            // 如果有占位符，记录它们的位置
            if (result.placeholders && result.placeholders.length > 0) {
                console.log(`  - 发现 ${result.placeholders.length} 个占位符`);
            }

        } catch (error) {
            console.error(`✗ 幻灯片 ${slideNumber} 转换失败:`, error.message);
            throw error;
        }
    }

    // 设置演示文稿级别的主题
    pptx.defineSlideMaster({
        title: 'ANTHROPIC_MASTER',
        background: { fill: colors.light },
        margin: 0,
        fontFace: 'Arial',
        fontSize: 14,
        color: colors.dark
    });

    // 保存演示文稿
    const outputFile = 'anthropic-skills-framework-analysis.pptx';
    console.log(`保存演示文稿为: ${outputFile}`);

    await pptx.writeFile({ fileName: outputFile });

    console.log('✓ 演示文稿创建完成！');
    console.log(`输出文件: ${outputFile}`);
    console.log(`总幻灯片数: ${slideFiles.length}`);

    return outputFile;
}

// 错误处理
process.on('unhandledRejection', (reason, promise) => {
    console.error('未处理的Promise拒绝:', reason);
    process.exit(1);
});

// 执行创建
createAnthropicSkillsPresentation()
    .then((outputFile) => {
        console.log(`\n🎉 成功！PowerPoint演示文稿已创建: ${outputFile}`);
        console.log('\n下一步：');
        console.log('1. 运行 python scripts/thumbnail.py anthropic-skills-framework-analysis.pptx 生成缩略图');
        console.log('2. 检查生成的演示文稿质量和格式');
    })
    .catch((error) => {
        console.error('\n❌ 创建演示文稿时出错:', error);
        process.exit(1);
    });