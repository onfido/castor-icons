module.exports = {
  multipass: true,
  plugins: [
    { name: 'cleanupAttrs' },
    { name: 'collapseGroups' },
    { name: 'convertShapeToPath' },
    { name: 'convertStyleToAttrs' },
    { name: 'inlineStyles' },
    { name: 'minifyStyles' },
    { name: 'removeAttrs', params: { attrs: '(fill|stroke)' } },
    { name: 'removeComments' },
    { name: 'removeDoctype' },
    { name: 'removeEmptyAttrs' },
    { name: 'removeEmptyContainers' },
    { name: 'removeEmptyText' },
    { name: 'removeMetadata' },
    { name: 'sortAttrs' },
  ],
};
