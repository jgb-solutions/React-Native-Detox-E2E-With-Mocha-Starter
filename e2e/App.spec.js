describe('App Screen', () => {
  beforeEach(async () => {
    await device.reloadReactNative();
  });

  it('displays `MY BLOG POSTS`', async () => {
    await expect(element(by.id('blogTitle'))).toHaveText('MY BLOG POSTS');
  });

  it('Shows post body content for the first post', async () => {
    await element(by.id('postTitle-1')).tap();
    await expect(element(by.id('postBodyText-1'))).toBeVisible();
  });
});
