const User = require('./models/user');

async function createUser() {
    const user = new User({ email: 'test@example.com', password: '123456' });
    await user.save();
    console.log('Usuario creado:', user);
}

createUser();