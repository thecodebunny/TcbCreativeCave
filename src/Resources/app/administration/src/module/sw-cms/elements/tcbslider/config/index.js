/*
 * Copyright (c) 2022. TheCodeBunny (Hemang Vyas) All rights reserved.
 *  
 *  Unauthorized copying of this file, via any medium is strictly prohibited Proprietary and confidential.
 *
 * Author : Hemang Vyas (TheCodeBunny)
 * Website: https://hemangvyas.com
 * Email: hemang@hemangvyas.com
 */

import template from './sw-cms-el-config-tcbslider.html.twig';
import './sw-cms-el-config-tcbslider.scss';

const { Component, Mixin } = Shopware;
const { cloneDeep } = Shopware.Utils.object;
const Criteria = Shopware.Data.Criteria;

Component.register('sw-cms-el-config-tcbslider', {
    template,

    inject: ['repositoryFactory'],

    mixins: [
        Mixin.getByName('cms-element'),
    ],

    data() {
        return {
            image1ModalIsOpen: false,
            initialFolderId: null
        };
    },

    computed: {
        uploadTag() {
            return `cms-element-media-config-${this.element.id}`;
        },

        mediaRepository() {
            return this.repositoryFactory.create('media');
        },

        defaultFolderName() {
            return this.cmsPageState.pageEntityName;
        },

        previewSource() {
            if (this.element.data && this.element.data.tcbSlide1Image && this.element.data.tcbSlide1Image.id) {
                return this.element.data.tcbSlide1Image;
            }

            return this.element.config.tcbSlide1Image.value;
        },
    },

    created() {
        this.createdComponent();
    },

    methods: {
        async createdComponent() {
            this.initElementConfig('tcbslider');
        },

        async onImage1Upload({ targetId }) {
            const mediaEntity = await this.mediaRepository.get(targetId);

            this.element.config.tcbSlide1Image.value = mediaEntity.id;
            this.element.config.tcbSlide1Image.source = 'static';

            this.updateElementData(mediaEntity);

            this.$emit('element-update', this.element);
        },

        onImage1Remove() {
            this.element.config.tcbSlide1Image.value = null;

            this.updateElementData();

            this.$emit('element-update', this.element);
        },

        onCloseImage1Modal() {
            this.image1ModalIsOpen = false;
        },

        onSelection1Changes(mediaEntity) {
            const media = mediaEntity[0];
            this.element.config.tcbSlide1Image.value = media.id;
            this.element.config.tcbSlide1Image.source = 'static';

            this.updateElementData(media);

            this.$emit('element-update', this.element);
        },

        updateElementData(media = null) {
            const mediaId = media === null ? null : media.id;
            if (!this.element.data) {
                this.$set(this.element, 'data', { mediaId, media });
            } else {
                this.$set(this.element.data, 'mediaId', mediaId);
                this.$set(this.element.data, 'media', media);
            }
        },

        onOpenImage1Modal() {
            this.image1ModalIsOpen = true;
        },
    },
});
