set :stages, ["staging", "production"]
set :default_stage, "staging"
require "capistrano/ext/multistage"

set :application, "jonsuh.com"

set :host, "" # PARTS OF THIS LINE HAVE BEEN REMOVED
role :web, host
role :app, host
role :db,  host, :primary => true

default_run_options[:pty] = true
ssh_options[:forward_agent] = true

set :deploy_via, :copy
set :copy_compression,  :gzip
set :normalize_asset_timestamps, false

set :scm, :none
set :repository,  "_site"
# set :copy_exclude, ["_site/assets/images"]
set :branch, "master"

set :user, "" # PARTS OF THIS LINE HAVE BEEN REMOVED
set :group, user
set :use_sudo, false

set :keep_releases, 5
after "deploy:update", "deploy:cleanup"

namespace :assets do

  task :symlink do
    run "ln -s " # PARTS OF THIS LINE HAVE BEEN REMOVED
    run "ln -s " # PARTS OF THIS LINE HAVE BEEN REMOVED
  end

  after "deploy:finalize_update", "assets:symlink"

end