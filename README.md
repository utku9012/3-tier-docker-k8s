# 3-Tier To-Do Application

3 katmanlı To-Do uygulama, mimarisi AWS bulut altyapısı ( EC2 ) üzerinde Kubernetes ile yayına alınmasını kapsayan bir projem. 


Uygulamanın her katmanını Docker kullanılarak izole ettim. Frontend tarafında "Multi-stage Build" kullanılarak image boyutunu azalttım. Backend tarafında daha stail bir sürüm olduğu için node:18-alpine image'ini kullandım. Podlar silindiğinde veri kaybı yaşanmaması için PersistentVolumeClaim (PVC) ekledim. PostgreSQL verileri, Oluşturduğum AWS EC2 üzerinde saklanıyor. Backend, veritabanına Kubernetes iç ağındaki db-service ismi üzerinden ulaşıyor dış dünyaya olan servisi ise EC2 Security Group üzerinden CUSTOM TPC tanımlayarak 0.0.0.0/0 üzerinden açtım. Her mikroservis için kaynak yönetimi ekledim ve Liveness,Readiness probelarını manifestolara ekledim. Grafana üzerinden de kaynak tüketimi ve podların durumu monitoring ediliyor.


# Kurulum Talimatları:

Repo'yu Klonlayın: git clone <repo-url>

İmageları Build Edin:

Bash
docker build -t my-backend:v4 ./backend
docker build -t my-frontend:v1 ./frontend

K8s Kaynaklarını Dağıtın:

Bash
kubectl apply -f k8s/db-pvc.yaml
kubectl apply -f k8s/db-deployment.yaml
kubectl apply -f k8s/backend-deployment.yaml
kubectl apply -f k8s/frontend-deployment.yaml

🔗 Erişim Noktaları
Frontend UI: http://<AWS-IP>:30080

API Health: http://<AWS-IP>:30000/todos

Grafana Monitoring: http://<AWS-IP>:31000
