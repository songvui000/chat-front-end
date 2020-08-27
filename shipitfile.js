module.exports = shipit => {
  // Load shipit-deploy tasks
  require('shipit-deploy')(shipit)

  shipit.initConfig({
    default: {
      deployTo: '/home/ubuntu/chat-front-end',
      repositoryUrl: 'git@github.com:songvui000/chat-front-end.git',
    },
    production: {
      servers: [
        {
          host: '18.191.163.28',
          user: 'ubuntu',
          key: '/Users/anhvirt/.ssh/anhviet.pem'
        },
        {
          host: '18.218.199.177',
          user: 'ubuntu',
          key: '/Users/anhvirt/.ssh/anhviet.pem'
        },
      ],
      branch: 'master',
    }
  })

  shipit.on('deployed', () => {
    let cmd = '';
    cmd += `cd ${shipit.currentPath} && `;
    cmd += 'npm install && npm run build --max_old_space_size=2196';

    shipit.remote(cmd);
  });
}