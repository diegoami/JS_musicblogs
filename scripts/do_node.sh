cd /home/ubuntu/projects/JS_musicblogs/
node update_files.js
scp json/* ubuntu@18.185.30.140:/home/ubuntu/projects/JS_FE_musicblogs/public
git commit -a
git push origin master

