/*
 * Copyright (c) 2022. TheCodeBunny (Hemang Vyas) All rights reserved.
 *
 *  Unauthorized copying of this file, via any medium is strictly prohibited Proprietary and confidential.
 *
 * Author : Hemang Vyas (TheCodeBunny)
 * Website: https://hemangvyas.com
 * Email: hemang@hemangvyas.com
 */

import './component';
import './preview';

Shopware.Service('cmsService').registerCmsBlock({
    name: "tcbslider",
    category: 'image',
    label: 'TheCodeBunny Advanced Slider',
    component: 'sw-cms-block-tcbslider',
    previewComponent: 'sw-cms-preview-tcbslider',
    defaultConfig: {

    },
    slots: {
        slider: 'slider'
    }
});