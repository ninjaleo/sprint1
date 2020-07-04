pipeline {
  environment {
    registry = "sureshtripini/sales-portal-expressjs-backend"
    registryCredential = 'DOCKER_HUB'
    dockerImage = ''
  }
  agent any
 
 stages {
   
    stage('Build Image') {
      steps{
        script {
          dockerImage = docker.build registry + ":$BUILD_NUMBER"
        }
      }
    }
	
    stage('Push Image') {
      steps{
        script {
            docker.withRegistry( '', registryCredential ) {
            dockerImage.push()
          }
        }
      }
    }
    
    stage('Run Container') {
      steps{
        sh "docker run -itd -p 3001:3000 $registry:$BUILD_NUMBER"
      }
    }
    
    stage('Cleanup') {
      steps{
        cleanWs()
      }
    }
    
    
    
    /* stage('Remove Image') {
      steps{
        sh "docker rmi $registry:$BUILD_NUMBER"
      }
    }
    */
  }
}
