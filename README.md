# node.js-elasticsearch

## elastic search and kibana docker run commands

for more information go to elastic search docker run documentation

```shell
docker pull docker.elastic.co/kibana/kibana:8.11.1
docker pull docker.elastic.co/elasticsearch/elasticsearch:8.11.1

# increase system vm.max_map_count 
sudo sysctl -w vm.max_map_count=262144

docker run --name es01 --net elastic -p 9200:9200 -it -m 1GB docker.elastic.co/elasticsearch/elasticsearch:8.11.1
docker run --name kib01 --net elastic -p 5601:5601 docker.elastic.co/kibana/kibana:8.11.1
```