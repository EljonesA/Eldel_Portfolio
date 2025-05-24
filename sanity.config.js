'use client'

/**
 * This configuration is used to for the Sanity Studio that’s mounted on the `\app\studio\[[...tool]]\page.jsx` route
 */

import {visionTool} from '@sanity/vision'
import {defineConfig} from 'sanity'
import {structureTool} from 'sanity/structure'
import {apiVersion, dataset, projectId} from './sanity/env'
import {schema} from './sanity/schemaTypes'
import {structure} from './sanity/structure'

export default defineConfig({
  basePath: '/studio',
  projectId,
  dataset,
  token: 'skr9kUWjFOrF1KhGLvfXe2prZuS1p4dnPSFyyyc0iIAOOxL9ucuak9t1dCH16uyELgl4TyJRyrS7P0XHXKeDKdzmuQMLnqmPQbRVufMoKy8Jq2HgXKBrGPIbVUHBCfTvgC1bUBDPrsLSPVCSla7k8GjXChmpaXx29tpKBuOVSqaQ0twvXLRd',
  // Add and edit the content schema in the './sanity/schemaTypes' folder
  schema,
  plugins: [
    structureTool({structure}),
    // Vision is for querying with GROQ from inside the Studio
    // https://www.sanity.io/docs/the-vision-plugin
    visionTool({defaultApiVersion: apiVersion}),
  ],
})
