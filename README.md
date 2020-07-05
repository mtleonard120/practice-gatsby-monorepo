# Practice Gatsby Monorepo

Project intended to practice a number of concepts, particularly the basics of gatsby and also the managing shared components/styles among multiple gatsby sites in a monorepo.

I also wanted to better understand the build process in monorepos - I am hosting [multiple](https://practice-gatsby-monorepo-site1.netlify.app/) [sites](https://practice-gatsby-monorepo-site2.netlify.app/) from this repo via Netlify.

## Running Sites Locally

To get started here, run `yarn install` in the project root to install dependencies for all the packages in the monorepo. Then to run a development site, run `npm run site1` or `npm run site2`. This kicks off the gatsby development server - any time you make a change to one of the dependencies of the site you are running (like in the `shared` package) you'll see the dev server hot-replace any affected module.

## Further Ideas for Practice

A nice extension project would be to use nrwl's nx library for dependency analysis to properly manage/limit the CI process during netlify builds. See [here](https://www.netlify.com/blog/2020/04/21/deploying-nx-monorepos-to-netlify/) for more information about how this would work.
