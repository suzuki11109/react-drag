pipeline {
  agent any
  stages {
    stage('Tests') {
      steps {
        sh 'docker run --rm -v `pwd`:/workspace kkarczmarczyk/node-yarn /bin/bash -c "yarn test"'
      }
    }
  }
  environment {
    CI = 'true'
  }
}