import { faExternalLink } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { Link } from "react-router-dom"

import { PodcastModel } from "model"

const PodcastList: React.FC<Props> = ({ podcasts }) => {
  return (
    <ul className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
      {podcasts?.map((podcast) => <PodcastListItem key={podcast.getId()} podcast={podcast} />)}
    </ul>
  )
}

const PodcastListItem: React.FC<{ podcast: PodcastModel }> = ({ podcast }) => (
  <li className="col-span-1 flex flex-col divide-y divide-gray-200 rounded-lg bg-white text-center shadow">
    <div className="flex flex-1 flex-col p-8">
      <img
        loading="lazy"
        className="mx-auto h-32 w-32 flex-shrink-0 rounded-full"
        src={podcast.getImage()}
        alt="cover"
      />
      <h3 title="Author" className="mt-6 text-sm font-medium text-gray-900">
        {podcast.getAuthor()}
      </h3>
      <dl className="mt-1 flex flex-grow flex-col justify-between">
        <dt className="sr-only">Title</dt>
        <dd title="Title" className="text-sm text-gray-500">
          {podcast.getTitle()}
        </dd>
        <dt className="sr-only">Category</dt>
        <dd className="mt-3">
          <span
            title="Category"
            className="inline-flex items-center rounded-full bg-green-50 px-2 py-1 text-xs font-medium text-green-700 ring-1 ring-inset ring-green-600/20"
          >
            {podcast.getCategory()}
          </span>
        </dd>
      </dl>
    </div>
    <div>
      <Link
        to={`/podcast/${podcast.getId()}`}
        className="flex items-center justify-center gap-x-3 rounded-br-lg border border-transparent py-4 text-sm font-semibold text-gray-900"
      >
        <FontAwesomeIcon className="text-gray-400" icon={faExternalLink} />
        See details
      </Link>
    </div>
  </li>
)

type Props = {
  podcasts: PodcastModel[]
}

export { PodcastList }
