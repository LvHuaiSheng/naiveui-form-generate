import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { resolve } from 'path'
import { createSvgIconsPlugin } from 'vite-plugin-svg-icons'
// https://vitejs.dev/config/
export default defineConfig({

  plugins: [
      createSvgIconsPlugin({
          // 指定需要缓存的图标文件夹
          iconDirs: [resolve(process.cwd(), 'src/icons/svg')],
          // 指定symbolId格式
          symbolId: 'icon-[name]',
      }),
      vue()]
})
