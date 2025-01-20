document.querySelector('.new-post-form').addEventListener('submit', async (event) => {
    event.preventDefault();
  
    const title = document.querySelector('#post-title').value.trim();
    const content = document.querySelector('#post-desc').value.trim();
  
    if (title && content) {
      try {
        const response = await fetch('/api/post', {
          method: 'POST',
          body: JSON.stringify({ title, content }),
          headers: { 'Content-Type': 'application/json' },
        });
  
        if (response.ok) {
          document.location.replace('/profile');
        } else {
          alert('Failed to create post.');
        }
      } catch (error) {
        console.error('Error during post creation:', error);
      }
    }
});
  
document.querySelector('.post-list').addEventListener('click', async (event) => {
    if (event.target.hasAttribute('data-id')) {
      const id = event.target.getAttribute('data-id');
  
      try {
        const response = await fetch(`/api/post/${id}`, {
          method: 'DELETE',
        });
  
        if (response.ok) {
          document.location.replace('/profile');
        } else {
          alert('Failed to delete post.');
        }
      } catch (error) {
        console.error('Error during post deletion:', error);
      }
    }
});