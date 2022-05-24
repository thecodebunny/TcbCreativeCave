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
            mediaModalIsOpen: false,
            initialFolderId: null,
            entity: this.element,
            mediaItems: [],
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

        items() {
            if (this.element.config && this.element.config.tcbSliderItems && this.element.config.tcbSliderItems.value) {
                return this.element.config.tcbSliderItems.value;
            }

            return [];
        },
    },

    created() {
        this.createdComponent();
    },

    methods: {
        async createdComponent() {
            this.initElementConfig('tcbslider');
            if (this.element.config.tcbSliderItems.source !== 'default' && this.element.config.tcbSliderItems.value.length > 0) {
                const mediaIds = this.element.config.tcbSliderItems.value.map((configElement) => {
                    return configElement.mediaId;
                });

                const criteria = new Criteria();
                criteria.setIds(mediaIds);

                const searchResult = await this.mediaRepository.search(criteria);
                this.mediaItems = mediaIds.map((mediaId) => {
                    return searchResult.get(mediaId);
                });
            }
        },

        onImageUpload(mediaItem) {
            const tcbSliderItems = this.element.config.tcbSliderItems;
            if (tcbSliderItems.source === 'default') {
                tcbSliderItems.value = [];
                tcbSliderItems.source = 'static';
            }

            tcbSliderItems.value.push({
                mediaUrl: mediaItem.url,
                mediaId: mediaItem.id,
                url: null,
                newTab: false,
            });

            console.log(mediaItem);

            this.mediaItems.push(mediaItem);

            this.updateMediaDataValue();
            this.emitUpdateEl();
        },

        onItemRemove(mediaItem, index) {
            const key = mediaItem.id;
            const { value } = this.element.config.tcbSliderItems;

            this.element.config.tcbSliderItems.value = value.filter(
                (item, i) => {
                    return (item.mediaId !== key || i !== index);
                },
            );

            this.mediaItems = this.mediaItems.filter(
                (item, i) => {
                    return (item.id !== key || i !== index);
                },
            );

            this.updateMediaDataValue();
            this.emitUpdateEl();
        },

        onCloseMediaModal() {
            this.mediaModalIsOpen = false;
        },

        onMediaSelectionChange(mediaItems) {
            const tcbSliderItems = this.element.config.tcbSliderItems;
            if (tcbSliderItems.source === 'default') {
                tcbSliderItems.value = [];
                tcbSliderItems.source = 'static';
            }

            mediaItems.forEach((item) => {
                this.element.config.tcbSliderItems.value.push({
                    mediaUrl: item.url,
                    mediaId: item.id,
                    url: null,
                    newTab: false,
                });
            });

            this.mediaItems.push(...mediaItems);

            this.updateMediaDataValue();
            this.emitUpdateEl();
        },

        updateMediaDataValue() {
            if (this.element.config.tcbSliderItems.value) {
                const tcbSliderItems = cloneDeep(this.element.config.tcbSliderItems.value);

                tcbSliderItems.forEach((tcbSliderItem) => {
                    this.mediaItems.forEach((mediaItem) => {
                        if (tcbSliderItem.mediaId === mediaItem.id) {
                            tcbSliderItem.media = mediaItem;
                        }
                    });
                });

                if (!this.element.data) {
                    this.$set(this.element, 'data', { tcbSliderItems });
                } else {
                    this.$set(this.element.data, 'tcbSliderItems', tcbSliderItems);
                }
            }
        },

        onOpenMediaModal() {
            this.mediaModalIsOpen = true;
        },

        onChangeMinHeight(value) {
            this.element.config.minHeight.value = value === null ? '' : value;

            this.$emit('element-update', this.element);
        },

        onChangeDisplayMode(value) {
            if (value === 'cover') {
                this.element.config.verticalAlign.value = null;
            }

            this.$emit('element-update', this.element);
        },

        emitUpdateEl() {
            this.$emit('element-update', this.element);
        },
    },
});
