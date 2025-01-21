# frozen_string_literal: true

Gem::Specification.new do |spec|
  spec.name          = "blog-theme"
  spec.version       = "0.0.2"
  spec.authors       = ["Marcus Felling"]
  spec.summary       = "Jekyll theme for personal blog"
  spec.homepage      = "https://marcusfelling.github.io/blog-theme/"

  spec.files         = `git ls-files -z`.split("\x0").select { |f| f.match(%r{^(assets|_layouts|_includes|feed|404|tags|staticman)}i) }

  spec.metadata      = {
    "documentation_uri" => "https://github.com/marcusfelling/blog-theme"
  }

  spec.add_runtime_dependency "jekyll", ">= 3.9.3"
  spec.add_runtime_dependency "jekyll-paginate", "~> 1.1"
  spec.add_runtime_dependency "jekyll-sitemap", "~> 1.4"
  spec.add_runtime_dependency "kramdown-parser-gfm", "~> 1.1"
  spec.add_runtime_dependency "kramdown", "~> 2.3"
  spec.add_runtime_dependency "webrick", "~> 1.8"

  spec.add_development_dependency "bundler", ">= 1.16"
  spec.add_development_dependency "rake", "~> 12.0"
  spec.add_development_dependency "appraisal", "~> 2.5"
end
