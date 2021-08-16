## Set up jenkins server on linux (the recommanded RAM is 4GB and 4 vCPUs)

```
sudo yum update -y
sudo wget -O /etc/yum.repos.d/jenkins.repo http://pkg.jenkins-ci.org/redhat/jenkins.repo
sudo rpm --import https://pkg.jenkins.io/redhat/jenkins.io.key
sudo yum install java-1.8.0 -y
sudo yum install jenkins -y
sudo service jenkins start
sudo cat /var/lib/jenkins/secrets/initialAdminPassword
```

## Set up jenkins server on ubuntu (the recommanded RAM is 4GB and 4 vCPUs)

```
sudo apt-get update
sudo apt-get install openjdk-8-jdk
wget -q -O - https://pkg.jenkins.io/debian-stable/jenkins.io.key | sudo apt-key add -
sudo sh -c 'echo deb https://pkg.jenkins.io/debian-stable binary/ > \
    /etc/apt/sources.list.d/jenkins.list'
sudo apt-get update
sudo apt-get install jenkins



# set up ansible server

## install ansible

```

yum install python-pip -y
pip install ansible

```

## create the inventory file

```

mkdir /etc/ansible
sudo nano /etc/ansible/hosts

```

# set up docker-compose

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

# Set up the kubernetes cluster

### 1. run the following command on the both instances you created above

```

sudo apt-get update -y
sudo apt-get install -y apt-transport-https ca-certificates curl
sudo curl -fsSLo /usr/share/keyrings/kubernetes-archive-keyring.gpg https://packages.cloud.google.com/apt/doc/apt-key.gpg
echo "deb [signed-by=/usr/share/keyrings/kubernetes-archive-keyring.gpg] https://apt.kubernetes.io/ kubernetes-xenial main" | sudo tee /etc/apt/sources.list.d/kubernetes.list
sudo apt-get update -y
sudo apt-get install -y kubelet kubeadm kubectl
sudo apt-mark hold kubelet kubeadm kubectl
sudo apt install docker.io -y

```


### 2. check the cgroup driver of your container runtime (docker in our case)

```

sudo docker info | grep -i cgroup

```


### 3. initialization of the master node run the command below (run this command only on the master node)
* make sure that the kubelet and the container runtime have the same cgroup driver
```

sudo kubeadm init --config config-kubeadm.yml

```


### 4. install the network plugin on the control plane (master node in our case)

```

sudo kubectl apply -f https://raw.githubusercontent.com/coreos/flannel/master/Documentation/kube-flannel.yml

```

```
