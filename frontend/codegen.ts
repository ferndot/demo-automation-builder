import type { CodegenConfig } from '@graphql-codegen/cli'
 
const config: CodegenConfig = {
  // TODO: Use an environment variable for this
  schema: 'http://localhost:8080/graphql',
  documents: ['src/**/*.vue'],
  ignoreNoDocuments: true, // for better experience with the watcher
  generates: {
    './src/gql/': {
      preset: 'client',
      config: {
        useTypeImports: true
      }
    }
  }
}
 
export default config