const backendAddress = "http://localhost:3000"
// const backendAddress = "https://hedgehog-party.herokuapp.com"
const getHedgehogs = () => {
  $('#hedgehog-info').html('');

  fetch(`${backendAddress}/api/v1/invites`)
  .then(response => response.json())
  .then(hedgehogs => appendHedgehogs(hedgehogs))
  .catch(error => console.error({ error }));
};

const appendHedgehogs = (hedgehogs) => {
  hedgehogs.forEach(hedgehog => {
    appendHedgehog(hedgehog);
  });
};

const appendHedgehog = (hedgehog) => {
  $('#invited-hedgehogs-info').append(`
    <article class="invited-hedgehog">
    <p class="name">${hedgehog.name}</p>
    <p class="hoglet-number">${hedgehog.hoglets}</p>
    <p class="allergies">${hedgehog.allergies}</p>
    <button
    id="${hedgehog.id}"
    class="uninvite-btn"
    aria-label="Uninvite">
    uninvite
    </button>
    </article>
    `);
  };

  const addNewHedgehog = () => {
    postHedgehog({
      name: $('#name').val(),
      hoglets: $('#hoglets').val(),
      allergies: $('#allergies').val()
    });

  };

  const postHedgehog = (hedgehog) => {
    fetch(`${backendAddress}/api/v1/invites`,  {
      method: "POST",
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(hedgehog)
    })
    .then(response => {
      return response.json();
    })
    .then(jsonResponse => {
      console.log(jsonResponse);
    });
  }

  const unInviteHedgehog = (button) => {
    deleteHedgehog({
      id: $(button).attr('id')
    });
  };

  const deleteHedgehog = (hedgehog) => {
    fetch(`${backendAddress}/api/v1/invites/${hedgehog.id}`,  {
      method: "DELETE"
    })
    .then(response => {
      location.reload();
    })

  }

  getHedgehogs();

  $('#invite-btn').on('click', addNewHedgehog);

  $('#invited-hedgehogs-info').on('click', '.uninvite-btn', function() {
    unInviteHedgehog(this);
  });

  //URL: https://hedgehog-party.herokuapp.com/api/v1/invites
