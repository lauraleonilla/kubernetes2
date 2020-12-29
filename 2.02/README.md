### Assignment 2.02

You can use the service on port :8081 with following:

1. k3d cluster delete
2. k3d cluster create -p 8081:80@loadbalancer --agents 2
3. kubectl apply -f manifests/deployment.yaml
4. kubectl apply -f manifests/service.yaml 
5. kubectl apply -f manifests/ingress.yaml 

:8081 will display an ToDo listwith an image.