
document.getElementById('userForm').addEventListener('submit', async function(event) {
    event.preventDefault();

    const name = document.getElementById('name').value;
    const age = document.getElementById('age').value;
    const email = document.getElementById('email').value;

    const response = await fetch('/usuarios', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ name, age, email })
    });

    if (response.ok) {
        alert('Usuário cadastrado com sucesso!');
    } else {
        alert('Erro ao cadastrar usuário.');
    }
});