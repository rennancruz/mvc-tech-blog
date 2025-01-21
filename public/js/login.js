document.querySelector('.login-form').addEventListener('submit', async (event) => {
    event.preventDefault();
  
    const email = document.querySelector('#email-login').value.trim();
    const password = document.querySelector('#password-login').value.trim();
  
    if (email && password) {
      try {
        const response = await fetch('/api/users/login', {
          method: 'POST',
          body: JSON.stringify({ email, password }),
          headers: { 'Content-Type': 'application/json' },
        });
  
        if (response.ok) {
          document.location.replace('/profile');
        } else {
          alert('Failed to log in. Check your email or password.');
        }
      } catch (error) {
        console.error('Error during login:', error);
      }
    }
});
  
document.querySelector('.signup-form').addEventListener('submit', async (event) => {
    event.preventDefault();
  
    const username = document.querySelector('#username-signup').value.trim();
    const email = document.querySelector('#email-signup').value.trim();
    const password = document.querySelector('#password-signup').value.trim();
  
    if (username && email && password) {
      if (password.length < 8) {
        alert('Password must be at least 8 characters long.');
        return;
      }
      try {
        const response = await fetch('/api/users', {
          method: 'POST',
          body: JSON.stringify({ username, email, password }),
          headers: { 'Content-Type': 'application/json' },
        });
  
        if (response.ok) {
          document.location.replace('/profile');
        } else {
          alert('Failed to sign up. Ensure your details are correct.');
        }
      } catch (error) {
        console.error('Error during signup:', error);
      }
    } else {
      alert('Please fill out all fields before submitting.');
    }
});
