import {
    defineStackbitConfig,
    DocumentStringLikeFieldNonLocalized,
    SiteMapEntry
} from '@stackbit/types';
import { GitContentSource } from '@stackbit/cms-git';
import { allModels } from 'sources/local/models';

const gitContentSource = new GitContentSource({
    rootPath: __dirname,
    contentDirs: ['content'],
    models: Object.values(allModels),
    assetsConfig: {
        referenceType: 'static',
        staticDir: 'public',
        uploadDir: 'images',
        publicPath: '/'
    }
});

export const config = defineStackbitConfig({
    stackbitVersion: '~0.7.0',
    ssgName: 'nextjs',

    // 🔹 Burayı 18'den 20'ye çektik
    nodeVersion: '20',

    // 🔹 Visual editor preview server için dev komutu
    devCommand: 'node_modules/.bin/next dev --port {PORT} --hostname 127.0.0.1',

    styleObjectModelName: 'ThemeStyle',
    contentSources: [gitContentSource],
    presetSource: {
        type: 'files',
        presetDirs: ['sources/local/presets']
    },
    siteMap: ({ documents, models }): SiteMapEntry[] => {
        const pageModels = models
            .filter((model) => model.type === 'page')
            .map((model) => model.name);

        const entries = documents
            .filter((document) => pageModels.includes(document.modelName))
            .map<SiteMapEntry | null>((document) => {
                let slug = (document.fields.slug as DocumentStringLikeFieldNonLocalized)?.value;
                if (!slug) return null;

                // Başındaki / işaretlerini sil
                slug = slug.replace(/^\/+/, '');

                switch (document.modelName) {
                    case 'PostFeedLayout':
                        return {
                            urlPath: '/blog',
                            document
                        };
                    case 'PostLayout':
                        return {
                            urlPath: `/blog/${slug}`,
                            document
                        };
                    default:
                        return {
                            urlPath: `/${slug}`,
                            document
                        };
                }
            })
            // null dönenleri ayıklıyoruz
            .filter((entry): entry is SiteMapEntry => entry !== null);

        return entries;
    }
});

export default config;
