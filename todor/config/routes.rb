Rails.application.routes.draw do
  root :to =>'tasks#landing'
  resources :tasks, :only => [:index, :show, :edit,:new]
end
