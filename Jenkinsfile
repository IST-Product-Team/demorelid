def buildNumber = env.BUILD_NUMBER as int
if (buildNumber > 1) milestone(buildNumber - 1)
milestone(buildNumber)

def micrositeName = ''
def git_repo = "https://code.mylabzolution.com/yogatomy/base_reactjs.git"
def public_route_prefix = 'my'

def git_branch = 'dev_yoga'
def nexus_base_url = 'https://library.mylabzolution.com'
def nexus_deploy_repo = "$nexus_base_url/repository/ist_npm/"

def oc_command = 'replace'
def oc_mode = '--force=true'

def cpu_limit = '30m'
def memory_limit = '300Mi'
def max_replica_count = 1

def health_probe_port = '8080'
def health_probe_path = '/'

def host_okd = 'https://ocp.infosyssolusiterpadu.com:8443'
def ocp_project = 'poc-relid'
def env = 'relid'
def pull_secret = 'default-dockercfg-v54cj'


def appName
def appFullVersion
def gitCommitId

node ('nodejs') {
   stage ('Checkout'){
      git url: "${git_repo}", branch: "${git_branch}", credentialsId: 'gitlab-gagah'
   }

   stage ('Prepare'){
      withCredentials([[$class: 'UsernamePasswordMultiBinding',
         credentialsId: 'nexus',
         usernameVariable: 'nexus_username', passwordVariable: 'nexus_password']]) {
               sh """
                  echo 'Downloading ci-cd templates...'
                  rm -rf ./cicd-template
                  curl --fail -u ${nexus_username}:${nexus_password} -o cicd-template-${env}.tar.gz ${nexus_base_url}/repository/general-ist/cicd-template-${env}.tar.gz
                  mkdir cicd-template && tar -xzvf ./cicd-template-${env}.tar.gz -C "\$(pwd)/cicd-template"
                  """
      }

      appName = sh( script: 'node -e "console.log(require(\'./package.json\').name);"', returnStdout: true).trim()
      appFullVersion = sh( script: 'node -e "console.log(require(\'./package.json\').version);"', returnStdout: true).trim()
      appFullVersion = appFullVersion.substring(0, appFullVersion.lastIndexOf('.')) + ".${BUILD_NUMBER}"
      gitCommitId = sh(returnStdout: true, script: 'git rev-parse HEAD').trim()

      //sh 'sed -i \'s/ENVIRONMENT = "local"/ENVIRONMENT = "dev"/g\' ./src/config.js'
   }

    stage ('Install Dependencies'){
        sh """
        yarn cache clean --force
         rm package-lock.json || true
         rm -r node_modules || true
         CHROMEDRIVER_SKIP_DOWNLOAD=true
         rm -f .npmrc
         yarn install
      """
    }
    stage('Build Package'){
       sh 'PUBLIC_URL="/' + micrositeName + '" yarn run build'
    }

   stage('OpenShift Build'){
       withCredentials([[$class: 'UsernamePasswordMultiBinding',
            credentialsId: 'okd-gagah',
            usernameVariable: 'oc_username', passwordVariable: 'oc_password']]) {
                  sh 'oc login -u=${oc_username} -p=${oc_password} --server=https://ocp.infosyssolusiterpadu.com:8443 --insecure-skip-tls-verify=true'
               }
          appMajorVersion = appFullVersion.substring(0, appFullVersion.indexOf('.'))

        sh """
                set -x
                set -e

                oc project ${ocp_project}
                oc process -f ./cicd-template/openshift/build-config-template.yaml -n ${ocp_project} \
                  -p S2I_BUILD_IMAGE='nginx-114-rhel7' -p S2I_BUILD_IMAGE_PULL_SECRET='${pull_secret}' \
                  -p APP_NAME='${appName}' -p APP_FULL_VERSION='${appFullVersion}' -p APP_MAJOR_VERSION='${appMajorVersion}' \
                  -p GIT_COMMIT_ID=${gitCommitId} -p JENKINS_BUILD_NUMBER=${BUILD_NUMBER} \
                | oc ${oc_command} -n ${ocp_project} -f -

                oc start-build ${appName}-v${appMajorVersion} -n ${ocp_project} --from-dir ./build --follow
           """
    }
    stage('OpenShift Application ConfigMap'){
       sh """
               set -x
               set -e
               export APP_CONFIG_DATA='key=value'

               oc project ${ocp_project}
               oc process -f ./cicd-template/openshift/configmap-template.yaml -n ${ocp_project} \
                 -p APP_NAME='${appName}' -p APP_FULL_VERSION='${appFullVersion}' -p APP_MAJOR_VERSION='${appMajorVersion}' \
                 -p GIT_COMMIT_ID=${gitCommitId} -p JENKINS_BUILD_NUMBER=${BUILD_NUMBER} -p CONFIG_DATA="\$APP_CONFIG_DATA" \
                | oc ${oc_command} -n ${ocp_project} -f -
          """
   }

    stage('OpenShift Deployment'){
        sh """
            set -x
            set -e

            oc project ${ocp_project}
            oc process -f ./cicd-template/openshift/deployment-config-template.yaml -n ${ocp_project} \
            -p APP_NAME=${appName} -p APP_FULL_VERSION=${appFullVersion} -p APP_MAJOR_VERSION=${appMajorVersion}  \
            -p GIT_COMMIT_ID=${gitCommitId} -p JENKINS_BUILD_NUMBER=${BUILD_NUMBER} -p CPU_LIMIT=${cpu_limit} -p MEM_LIMIT=${memory_limit} \
            | oc ${oc_command} -n ${ocp_project} ${oc_mode} -f -
            sleep 5
            """

      if (public_route_prefix != null && public_route_prefix != ''){
        sh """
            set -x
            set -e

            oc project ${ocp_project}
            oc process -f ./cicd-template/openshift/route-template.yaml -n ${ocp_project} \
                -p APP_NAME=${appName} -p APP_FULL_VERSION=${appFullVersion} -p APP_MAJOR_VERSION=${appMajorVersion}  \
                -p GIT_COMMIT_ID=${gitCommitId} -p PUBLIC_ROUTE_PREFIX=${public_route_prefix} -p JENKINS_BUILD_NUMBER=${BUILD_NUMBER} \
                -p APP_ROUTE_PATH="/${micrositeName}" \
                | oc ${oc_command} -n ${ocp_project} ${oc_mode} -f -
            sleep 5
            """
      }
    }


   stage('Nginx ConfigMap'){
      sh """
            set -x
            set -e
            oc project ${ocp_project}
            oc delete configmap ${appName}-nginx-rewrite || true

            oc create configmap ${appName}-nginx-rewrite --from-file=./nginx.conf || true
            oc set volume dc/${appName}-v${appMajorVersion} --type=configmap --name=nginx-rewrite  --configmap-name=${appName}-nginx-rewrite --mount-path=/opt/app-root/etc/nginx.d/ --add=true --confirm=false || true
         """
   }
}