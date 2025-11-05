module.exports = {
  content: [
    './src/**/*.{js,jsx,ts,tsx}',
    './contents/**/*.{ts,tsx}', // 包含内容脚本路径
    './popup/**/*.{ts,tsx}',    // 如果有弹出窗口
    './options/**/*.{ts,tsx}'   // 如果有选项页面
  ],
  theme: {
    extend: {},
  },
  plugins: [],
}