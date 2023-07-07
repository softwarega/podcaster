import { PodcastDetailsModel } from "model"

const PodcastDetails: React.FC<Props> = ({ podcast }) => (
  <div className="flex flex-col space-y-2">
    <img
      loading="lazy"
      className="object-cover rounded-md mx-auto flex-shrink-0"
      src={podcast.getImage()}
      alt="cover"
    />
    <div className="divide-y space-y-2">
      <div className="flex justify-between items-center">
        <p>
          <span className="text-lg">{podcast.getTotalEpisodes()}</span>
          <span> episodes</span>
        </p>
        <span
          title="Category"
          className="inline-flex items-center rounded-full bg-green-50 px-2 py-1 text-xs font-medium text-green-700 ring-1 ring-inset ring-green-600/20"
        >
          {podcast.getCategory()}
        </span>
      </div>
      <div className="pt-2">
        <p title="Title" className="font-medium text-gray-900">
          {podcast.getTitle()}
        </p>
        <p title="Author" className="italic text-slate-700">
          by {podcast.getAuthor()}
        </p>
        <p title="Description" className="text-justify">
          {podcast.getDescription()}
        </p>
      </div>
    </div>
  </div>
)

type Props = {
  podcast: PodcastDetailsModel
}

export { PodcastDetails }
