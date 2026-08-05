import { defineConfig } from 'wxt'

export default defineConfig({
  manifest: {
    name: 'Kora Browser Diagnostics',
    description: 'Prepare selected browser diagnostics in Kora Desktop.',
    version: '0.1.0',
    permissions: ['activeTab', 'storage'],
    action: {
      default_title: 'Kora Browser Diagnostics',
    },
  },
})

