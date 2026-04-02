# 3-Tier To-Do Application

3 katmanlı To-Do uygulama mimarinin AWS bulut altyapısı ( EC2 ) üzerinde Kubernetes ile yayına alınmasını kapsayan bir projem. 


Uygulamanın her katmanını Docker kullanılarak izole ettim. Frontend tarafında "Multi-stage Build" kullanılarak imaj boyutu optimize edilmiş ve statik dosyalar Nginx ile sunulmuştur. Backend ise Node.js Alpine imajı üzerine inşa edilmiştir. Podlar silindiğinde veri kaybı yaşanmaması için PersistentVolumeClaim (PVC) kullanılmıştır. PostgreSQL verileri, AWS EBS veya yerel disk üzerinde güvenli bir şekilde saklanır. Backend, veritabanına Kubernetes iç ağındaki db-service ismi üzerinden ulaşır. Dış dünya ile iletişim ise NodePort servisleri aracılığıyla sağlanır.


Kurulum Talimatları
Repo'yu Klonlayın: git clone <repo-url>

İmajları Build Edin:

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

Monitoring: http://<AWS-IP>:31000