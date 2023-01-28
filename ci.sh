npm i -g yarn
yarn
npm i -g pm2
pm2 del "Convy Frontend"
# export NODE_OPTIONS=--max_old_space_size=4096
npm run build
pm2 start ./start.sh --name "Convy Frontend"