import './component';
import './preview';

Shopware.Service('cmsService').registerCmsBlock({
    name: 'tcb-initial-image',
    category: 'text-image',
    label: 'TCB Initial Image!',
    component: 'sw-cms-block-tcb-initial-image',
    previewComponent: 'sw-cms-preview-tcb-initial-image',
    defaultConfig: {
        marginBottom: '20px',
        marginTop: '20px',
        marginLeft: '20px',
        marginRight: '20px',
        sizingMode: 'boxed'
    },
    slots: {
        left: 'text',
        right: 'image'
    }
});