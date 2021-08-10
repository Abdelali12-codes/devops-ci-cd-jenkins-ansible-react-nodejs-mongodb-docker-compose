## Set up jenkins server

```
sudo yum update -y
sudo wget -O /etc/yum.repos.d/jenkins.repo http://pkg.jenkins-ci.org/redhat/jenkins.repo
sudo rpm --import https://pkg.jenkins.io/redhat/jenkins.io.key
sudo yum install java-1.8.0 -y
sudo yum install jenkins -y
sudo service jenkins start
sudo cat /var/lib/jenkins/secrets/initialAdminPassword
```

## set up ansible server

# install ansible

```
yum install python-pip -y
pip install ansible
```

# create the inventory file

```
mkdir /etc/ansible
sudo nano /etc/ansible/hosts
```

## set up docker-compose

```
sudo curl -L "https://github.com/docker/compose/releases/download/1.29.2/docker-compose-$(uname -s)-$(uname -m)" -o /usr/local/bin/docker-compose
sudo chmod +x /usr/local/bin/docker-compose
```

```
yum install docker -y
service docker start
service docker status
```

# to check the network of a container

```
docker inspect postgres -f "{{json .NetworkSettings.Networks }}")
```

- The backend : [nodejsmongodb](https://github.com/Abdelali12-codes/docker-compose-jenkins-ansible-react-mongo-nodejs-server)
